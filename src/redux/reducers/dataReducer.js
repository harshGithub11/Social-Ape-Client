import { LIKE_SCREAM, UNLIKE_SCREAM, SET_SCREAM, SET_SCREAMS, LOADING_DATA } from '../types';

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
        case LIKE_SCREAM:
        case UNLIKE_SCREAM: 
            let index = state.screams.findIndex(
                (scream) => scream.screamId === action.payload.screamId
            );
            state.screams[index] = action.payload;
            return {
                ...state
            };
        default: 
            return state
    }
};