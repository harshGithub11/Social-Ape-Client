import { LIKE_SCREAM, UNLIKE_SCREAM, SET_SCREAM, SET_SCREAMS, LOADING_DATA, DELETE_SCREAM, POST_SCREAM } from '../types';

const initialState = {
    screams: [],
    scream: {},
    loading: false
}

export default (state = initialState, action) => {
    switch(action.type){
        case LOADING_DATA: 
            return {
                ...state,
                loading: true
            }
        case SET_SCREAMS:
            return {
                ...state,
                loading: false,
                screams: action.payload
            }
        case POST_SCREAM:
            return {
                ...state,
                screams: [
                    action.payload,
                    ...state.screams
                ]
            }
        case LIKE_SCREAM:
        case UNLIKE_SCREAM: 
            let index = state.screams.findIndex(
                (scream) => scream.screamId === action.payload.screamId
            );
            state.screams[index] = action.payload;
            return {
                ...state
            };
        case DELETE_SCREAM: 
            let i = state.screams.findIndex(scream => scream.screamId === action.payload);
            state.screams.splice(i, 1);
            return{
                ...state,
            }
        default: 
            return state
    }
};