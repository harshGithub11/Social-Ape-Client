import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types';

//Importing axios package to send the request to server
import axios from 'axios';

export const loginUserAction = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post("/login", userData)
            .then(result => {
                //console.log(result.data);
                const FBIdToken = `Bearer ${result.data.token}`
                localStorage.setItem('FBIdToken', `Bearer ${result.data.token}`);
                axios.defaults.headers.common['Authorization'] = FBIdToken;    
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

export const getUserDataAction = () => (dispatch) => {
    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
} 