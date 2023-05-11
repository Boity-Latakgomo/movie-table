import { MovieActionEnum } from "./actions"
import { IMovieStateContext } from "./context"

//update state for each action and destructure and spread
export function MovieReducer(state: IMovieStateContext, action: ReduxActions.Action<IMovieStateContext>): IMovieStateContext{
    const {type, payload} = action;
    
    switch(type){
        case MovieActionEnum.createMovieRequest:
            return {
                ...state, ...payload 
            }
            case MovieActionEnum.fetchMoviesRequest:
            return {
                ...state, ...payload 
            }
            case MovieActionEnum.updateMovieRequest:
            return {
                ...state, ...payload 
            }
            case MovieActionEnum.deleteMovieRequest:
            return {
                ...state, ...payload 
            }
        default:
            return state
    }
}

