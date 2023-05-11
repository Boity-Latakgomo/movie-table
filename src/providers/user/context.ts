import { createContext } from 'react';

export interface IUser {
    userName: string,
    name: string,
    surname: string,
    phoneNumber: string,
    emailAddress: string,
    password: string,
    id: string,
    role?: string[] 
}

export interface ILogin {
    userNameOrEmailAddress: string,
    password: string,
}


export const INITIAL_STATE: IUserStateContext={}

export interface IUserStateContext {
    readonly UserLogin? : ILogin;
    readonly CreateUser?:IUser;
    readonly UserLogOut?:IUser;
    readonly currentUser?: IUser;
    readonly user?: IUser;
}

export interface IUserActionContext{
    loginUser?:(payload:ILogin) => void;
    createUser?:(payload:IUser) => void;
    logOutUser?:() => void;
    setCurrentUser?:(user:IUser) => void;
    getUserDetails?:(id:number) => void
}

const UserContext = createContext<IUserStateContext>(INITIAL_STATE);

const UserActionContext = createContext<IUserActionContext>(undefined);

export {UserContext, UserActionContext};