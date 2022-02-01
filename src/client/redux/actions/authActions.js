import {
    AUTH_USER,
    AUTH_USER_SUCCESS,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_AUTH,
    AUTH_CLEAR
} from './types';

/////////////////////////////////////////////////

export const authError = (error, success) => async (
    dispatch,
	getState,
	api
) => {
    dispatch({
        type: AUTH_ERROR,
        payload: error,
    });

	if (success) {
		success(error);
	}
};

export const authUser = (success) => async (
    dispatch,
	getState,
	api
) => {
    dispatch({
        type: AUTH_USER_SUCCESS,
    });

	if (success) {
		success();
	}
};

/////////////////////////////////////////////////

export const signinUser = ({ email, password, history, success }) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: AUTH_USER,
    });

    api
        .post("/signin", { email, password })
		.then(response => {
			dispatch({
                type: AUTH_USER_SUCCESS,
            });
			if (success) {
				success(response.data);
            }
            // dispatch(clearCurrentUser())
            localStorage.setItem('token', response.data.token)
            history.push("/")
            if(localStorage.getItem('token') == response.data.token) {
                location.reload();
                setTimeout(() => {
                    dispatch(fetchCurrentUser())
                }, 100)
            }

		})
		.catch(() => {
            dispatch(authError('Incorrect credentials'));
        });
}

/////////////////////////////////////////////////

export const signupUser = ({  email, password, history, success }) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: SIGNUP_USER
    });

    api
        .post("/signup", { email, password })
        .then(response => {
            dispatch({
                type: SIGNUP_USER_SUCCESS,
            });
            if (success) {
                success(response.data);
            }
            localStorage.setItem('token', response.data.token);
            history.push("/")
            if(localStorage.getItem('token') == response.data.token) {
                location.reload();
                setTimeout(() => {
                    dispatch(fetchCurrentUser())
                }, 100)
            }
        })
        .catch(() => {
            dispatch(authError('Account with this email already exists'));
        });
}

/////////////////////////////////////////////////

export const signoutUser = (success) => async (
    dispatch,
	getState,
	api
) => {
    dispatch({
        type: UNAUTH_USER
    });

    dispatch(clearCurrentUser())

    localStorage.removeItem('token');
    console.log('sign out')

	if (success) {
		success(error);
	}
};

/////////////////////////////////////////////////


export const fetchCurrentUser = (success) => async (dispatch, getState, api) => {
	const res = await api.get("user_details");

	dispatch({
		type: FETCH_AUTH,
		payload: res.data
    })
    
    if(res.data && success) {
        success()
    }
}

/////////////////////////////////////////////////

export const clearCurrentUser = () => async (dispatch, getState, api) => {
	dispatch({
		type: AUTH_CLEAR
	})
}