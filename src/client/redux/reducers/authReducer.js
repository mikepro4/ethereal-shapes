import {
    AUTH_USER_SUCCESS,
    SIGNUP_USER_SUCCESS,
    UNAUTH_USER,
    AUTH_USER,
    SIGNUP_USER,
    AUTH_ERROR,
    FETCH_MESSAGE
  } from '../actions/types';

export const initialState = {
    error: null,
    authenticated: false 
};

  
export const authReducer = function(state = initialState, action) {
    switch(action.type) {
        case AUTH_USER:
            return { ...state,
                error: null
            };
        case AUTH_USER_SUCCESS:
            return { ...state,
                error: null,
                authenticated: true
            };
        case SIGNUP_USER:
            return { ...state,
                error: null
            };
        case SIGNUP_USER_SUCCESS:
            return { ...state,
                error: null,
                authenticated: true
            };
        case UNAUTH_USER:
            return { ...state,
                error: '',
                authenticated: false 
            };
        case AUTH_ERROR:
            return { ...state,
                error: action.payload
            };
        case FETCH_MESSAGE:
            return { ...state,
                message: action.payload
            };
        }

    return state;
}
