import { createContext } from 'react';

//dto 
export interface IMovieDto {
    title: string,
    duration: string,
    year: string,
    description: string,
    category: string,
    id?: string
}

//state at first load time
export const INITIAL_STATE: IMovieStateContext = { }

//specifying the state 
export interface IMovieStateContext {
    readonly movieCreated?: IMovieDto;
    readonly moviesFetched?: Array<IMovieDto>;
    readonly movieUpdated?: IMovieDto;
    readonly movieDeleted?: string;
}

//specifying the action
export interface IMovieActionContext{
    createMovie?:(payload:IMovieDto) => void;
    fetchMovies?:() => void;
    updateMovie?:(payload:IMovieDto) => void;
    //we use string because guid is not in js
    deleteMovie?:(payload:string) => void;
}

//initializing the state and the action 
export const MovieStateContext = createContext<IMovieStateContext>(INITIAL_STATE);
export const MovieActionContext = createContext<IMovieActionContext>({});

