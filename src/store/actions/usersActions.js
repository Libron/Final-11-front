import axios from '../../axios-api';
import {push} from 'connected-react-router';
import {NotificationManager} from "react-notifications";

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';

const registerUserSuccess = user => ({type: REGISTER_USER_SUCCESS, user});
const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, error});

const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});

export const logoutUser = () => {
    return (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};

        return axios.delete('/users/session', config).then(
            () => {
                NotificationManager.success('Logged out successfully');
                dispatch({type: LOGOUT_USER})
            },
            error => {
                NotificationManager.error('Error');
                if (error.response) {
                    dispatch(registerUserFailure(error.response.data))
                } else {
                    dispatch(registerUserFailure({global: 'No connection'}))
                }
            }
        )
    }
};

export const registerUser = userData => {
    return dispatch => {
      return axios.post('/users', userData).then(
          response => {
              NotificationManager.success('New User Registered');
              dispatch(registerUserSuccess(response.data.user));
              dispatch(push('/'));
          },
          error => {
              NotificationManager.error('Missed some fields. Try again');
              if (error.response) {
                  dispatch(registerUserFailure(error.response.data))
              } else {
                  dispatch(registerUserFailure({global: 'No connection'}))
              }
          }
      )
    };
};

export const loginUser = userData => {
  return dispatch => {
      return axios.post('users/sessions', userData).then(
        response => {
            dispatch(loginUserSuccess(response.data.user));
            dispatch(push('/'));
        },
        error => {
            if (error.response) {
                dispatch(loginUserFailure(error.response.data))
            } else {
                dispatch(loginUserFailure({global: 'No connection'}))
            }
        }
      );
  };
};