import React, { FC, PropsWithChildren, useContext, useEffect, useReducer } from 'react';
import { MovieReducer } from './reducer';
import { IMovieDto, INITIAL_STATE, MovieActionContext, MovieStateContext } from './context';
import { message } from 'antd';
import { createMovieRequestAction ,deleteMovieRequestAction,fetchMoviesRequestAction, updateMovieRequestAction} from './actions';

//define the provider and the endpoint functionality
const MovieProvider: FC<PropsWithChildren> = ({ children }) => {
    //destructure the useReducer
    const [state, dispatch] = useReducer(MovieReducer, INITIAL_STATE)

    //call the api/backend/endpoints [CREATE_MOVIE_REQUEST_ACTION]
    const createMovie = async (movie: IMovieDto) => {
        await fetch('https://localhost:44311/api/services/app/Movie/Create', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        }).then(res => {
            res.json().then(data => {
                dispatch(createMovieRequestAction(movie));
                message.success("movie created successfully")
                // window.location.href = '/'
            })
        })
    }

    //[FETCH_MOVIES_REQUEST_ACTION]
    const fetchMovies = async () => {

        await fetch('https://localhost:44311/api/services/app/Movie/GetAll', {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => {
            res.json().then(data => {
                dispatch(fetchMoviesRequestAction(data.result));
                message.success('Movies fetched successfully');
            })
        })
    };    

    //[UPDATE_MOVIES_REQUEST_ACTION]
    const updateMovie = async (updatedData:IMovieDto) => {
        await fetch(`https://localhost:44311/api/services/app/Movie/Update/`, {
            method: 'PUT',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        }).then(res => {
            if (res.ok) {
                res.json().then(data => {
                    dispatch(updateMovieRequestAction(data.result))
                    console.log('updateMovie(): ', data.result)
                    message.success('Movie updated successfully');
                })
            } else {
                message.error('Failed to update movie');
            }
        })
    };

    //[DELETE_MOVIES_REQUEST_ACTION]
    const deleteMovie = async (movieId:string) => {
        await fetch(`https://localhost:44311/api/services/app/Movie/Delete?id=${movieId}`, {
            method: 'DELETE',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => {
            if (res.ok) {
                dispatch(deleteMovieRequestAction(res.url))
                console.log('delete::', res)
                console.log('deleteMovie(): Movie deleted successfully', res.json());
                message.success('Movie deleted successfully');
            } else {
                message.error('Failed to delete movie');
            }
        })
    };
    

    //creating a provider component
    return (
        <MovieStateContext.Provider value={state}>
            <MovieActionContext.Provider value={{ createMovie, fetchMovies, updateMovie, deleteMovie }}>
                {children}
            </MovieActionContext.Provider>
        </MovieStateContext.Provider>
    )

}

function useMovieState() {
    const context = useContext(MovieStateContext);
    if (!context) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }
    return context;
}

function useMovieAction() {
    const context = useContext(MovieActionContext);
    if (context === undefined) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }
    return context;
}

function useMovie() {
    return {
        ...useMovieState(),
        ...useMovieAction()
    }
}

export { MovieProvider, useMovie }