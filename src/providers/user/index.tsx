import React, { FC, PropsWithChildren, useReducer, useContext, useState } from 'react';
import { UserReducer } from './reducer';
import { INITIAL_STATE, IUser, UserActionContext, UserContext, ILogin } from './context';
import { loginUserRequestAction, createUserRequestAction, logOutUserRequestAction, setCurrentUserRequestAction, getUserDetailsRequestAction } from './actions';
import { message } from 'antd';

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

    const loginUser = async (userLoginInfo: ILogin) => {
        await fetch('https://localhost:44311/api/TokenAuth/Authenticate', {
            method: 'POST',
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userLoginInfo)
        }).then(res => {
            res.json().then(response => {
                dispatch(loginUserRequestAction(response.result));
                localStorage.setItem('token', response.result['accessToken'])
                let id = JSON.stringify(response.result['userId']);
                console.log(id)
                localStorage.setItem('userId', id)
                getUserDetails(id as unknown as number);
                window.location.href = '/table'

            })
        })
    };

    const createUser = async (userRegInfo: IUser) => {
        const token = localStorage.getItem("token");
        await fetch('https://localhost:44311/api/services/app/Person/Create', {
            method: 'POST',
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer  ${token}`
            },
            body: JSON.stringify(userRegInfo)
        }).then(res => {
            res.json().then(data => {
                dispatch(createUserRequestAction(userRegInfo));
                message.success("user registration successfull")
                window.location.href = '/'
            })
        })
    }



    const getUserDetails = async (id: number) => {
        const token = localStorage.getItem("token");
        await fetch(`https://localhost:44311/api/services/app/Person/Get?id=${id}`, {
            method: 'GET',
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer  ${token}`
            },
        }).then(res => {
            res.json().then(data => {
                dispatch(getUserDetailsRequestAction(id));
                
                dispatch(setCurrentUserRequestAction(data.result));
            })
        })
    }


    const logOutUser = () => {
        dispatch(logOutUserRequestAction());
        localStorage.removeItem('token');
        
       
    }

    return (
        <UserContext.Provider value={state} >
            <UserActionContext.Provider value={{
                loginUser,
                createUser,
                logOutUser,
                getUserDetails
            }}>
                {children}
            </UserActionContext.Provider>
        </UserContext.Provider>
    );
}

function useLoginState() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }
    return context;
}

function useLoginActions() {
    const context = useContext(UserActionContext);
    if (context === undefined) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }
    return context;
}

function useUser() {
    return {
        ...useLoginActions(),
        ...useLoginState()
    }
}
export { UserProvider, useUser };