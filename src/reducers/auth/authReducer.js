'use strict';
import Form from './authForm';
import {Record} from 'immutable';
import fieldValidation from '../../lib/fieldValidation';
import formValidation from './authFormValidation';
import _ from 'underscore';

import {
  SESSION_TOKEN_REQUEST,
  SESSION_TOKEN_SUCCESS,
  SESSION_TOKEN_FAILURE,

  LOGIN_STATE_LOGOUT,
  LOGIN_STATE_REGISTER,
  LOGIN_STATE_LOGIN,
  LOGIN_STATE_FORGOT_PASSWORD,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  
  ON_AUTH_FORM_FIELD_CHANGE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE
  
} from '../../lib/constants';

const InitialState = Record({
  form: new Form
});
const initialState = new InitialState;

export default function authReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
  switch (action.type) {

  case SESSION_TOKEN_REQUEST:
  case SIGNUP_REQUEST:
  case LOGOUT_REQUEST:
  case LOGIN_REQUEST:
  case RESET_PASSWORD_REQUEST:
      let nextState =  state.setIn(['form', 'isFetching'], true)
        .setIn(['form','error'],null);
    return nextState;


  case LOGIN_STATE_LOGOUT:
    return formValidation(
      state.setIn(['form', 'state'], action.type)
        .setIn(['form','error'],null)
        .setIn(['form','fields','username'],'')
        .setIn(['form','fields','email'],'')
        .setIn(['form','fields','password'],'')
        .setIn(['form','fields','passwordAgain'],'')
    );

  case LOGIN_STATE_LOGIN:
  case LOGIN_STATE_REGISTER:
  case LOGIN_STATE_FORGOT_PASSWORD:
    return formValidation(
      state.setIn(['form', 'state'], action.type)
        .setIn(['form','error'],null)
    );

  case ON_AUTH_FORM_FIELD_CHANGE: {
    const {field, value} = action.payload;
    let nextState =  state.setIn(['form', 'fields', field], value)
        .setIn(['form','error'],null);

    var finalState = formValidation(
      fieldValidation( nextState, action)
      , action);

    return finalState;
  }

  case SESSION_TOKEN_SUCCESS:
  case SESSION_TOKEN_FAILURE:
  case SIGNUP_SUCCESS:
  case LOGIN_SUCCESS:
  case LOGOUT_SUCCESS:
  case RESET_PASSWORD_SUCCESS:
    return state.setIn(['form', 'isFetching'], false);

    
  case SIGNUP_FAILURE:
  case LOGOUT_FAILURE:
  case LOGIN_FAILURE:
  case RESET_PASSWORD_FAILURE:
    return state.setIn(['form', 'isFetching'], false)
      .setIn(['form', 'error'], action.payload);
  }    

  return state;
}

