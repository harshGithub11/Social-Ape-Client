import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER } from '../types';

//Importing axios package to send the request to server
import axios from 'axios';

export const loginUserAction = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post("/login", userData)
            .then(result => {
                //console.log(result.data);
                setAuthorizationHeader(result.data.token);    
                dispatch(getUserDataAction());
                dispatch({ type: CLEAR_ERRORS });
                history.push("/");
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: SET_ERRORS,
                    payload: error.response.data
                })
            })
};

//-------------------------06 Aug---------------------------
export const signUpUserAction = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post("/signup", newUserData)
            .then(result => {
                //console.log(result.data);
                setAuthorizationHeader(result.data.token);
                dispatch(getUserDataAction());
                dispatch({ type: CLEAR_ERRORS });
                history.push("/");
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: SET_ERRORS,
                    payload: error.response.data
                })
            })
};

export const logOutUserAction = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
}
//-------------------------06 Aug---------------------------

export const getUserDataAction = () => (dispatch) => {
    dispatch({ type: LOADING_USER })
    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
} 

//-------------------------06 Aug---------------------------
const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`
    localStorage.setItem('FBIdToken', `Bearer ${token}`);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}
//-------------------------06 Aug---------------------------
