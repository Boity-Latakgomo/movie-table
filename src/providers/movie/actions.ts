import { createAction } from 'redux-actions';
import { IMovieDto, IMovieStateContext } from './context';

//specifies what action will be executed
export enum MovieActionEnum {
    createMovieRequest = 'CREATE_MOVIE_REQUEST',
    fetchMoviesRequest = 'FETCH_MOVIES_REQUEST',
    updateMovieRequest = 'UPDATE_MOVIE_REQUEST',
    deleteMovieRequest = 'DELETE_MOVIE_REQUEST'
}

//must match the variable in interface state context (movieCreated)
export const createMovieRequestAction = createAction<IMovieStateContext, IMovieDto>(MovieActionEnum.createMovieRequest, (movieCreated) => ({ movieCreated }));
export const fetchMoviesRequestAction = createAction<IMovieStateContext, Array<IMovieDto>>(MovieActionEnum.fetchMoviesRequest, (moviesFetched) => ({moviesFetched}));
export const updateMovieRequestAction = createAction<IMovieStateContext, IMovieDto>(MovieActionEnum.updateMovieRequest, (movieUpdated) => ({movieUpdated}));
export const deleteMovieRequestAction = createAction<IMovieStateContext, string>(MovieActionEnum.deleteMovieRequest, (movieDeleted) =>({movieDeleted}));
