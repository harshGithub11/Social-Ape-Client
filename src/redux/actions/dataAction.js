import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM, CLEAR_ERRORS, SET_ERRORS, LOADING_UI, SET_SCREAM, STOP_LOADING_UI, SUBMIT_COMMENT } from '../types';
import axios from 'axios';

//Get all screams
export const getScreamsAction = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/screams')
        .then(res => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_SCREAMS,
                payload: []
            })
        })
}

//Get a scream
export const getScreamAction = (screamId) => (dispatch) => {
    dispatch({
        type: LOADING_UI
    })
    axios.get(`/scream/${screamId}`)
        .then(res => {
            dispatch({
                type: SET_SCREAM,
                payload: res.data
            })
            dispatch({
                type: STOP_LOADING_UI
            })
        })
        .catch(err => console.log(err));
}

//Post a scream
export const postScreamAction = (newScream) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/scream', newScream)
        .then(res => {
            dispatch({
                type: POST_SCREAM,
                payload: res.data
            })
            dispatch({
                type: CLEAR_ERRORS
            })
        }) 
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
}

//Like a scream
export const likeScreamsAction = (screamId) => (dispatch) => {
    axios.get(`scream/${screamId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

//Unlike a scream
export const unlikeScreamAction = (screamId) => (dispatch) => {
    axios.get(`scream/${screamId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

//Submit a Comment
export const submitCommentAction = (screamId, commentBody) => (dispatch) => {
    axios.post(`/scream/${screamId}/comment`, commentBody)
        .then(res => {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data
            })
            dispatch(clearErrorsAction());
        })
        .catch(err => {
            console.log("errors is " + err);
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

//Delete a scream
export const deleteScreamAction = (screamId) => (dispatch) => { 
    axios.delete(`scream/${screamId}`)
        .then(
            dispatch({
                type: DELETE_SCREAM,
                payload: screamId
            })
        )
        .catch(err => console.log(err));
}

//Get User Details
export const getUserDataAction = (userHandle) => (dispatch) => {
    dispatch({
        type: LOADING_UI
    });
    axios.get(`/user/${userHandle}`)
        .then(res => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data.screams
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: SET_SCREAMS,
                payload: null
            })
        })
} 

//Clear Errors Action
export const clearErrorsAction = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}