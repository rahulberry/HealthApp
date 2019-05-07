import { 
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER, 
    CREATE_USER,
    LOGIN_USER_FACEBOOK
} from '../actions/types';
 
const INITIAL_STATE = { 
    email: '',
    password: '',
    user: null, 
    error: '',
    loading: 'false',
    loggedin: 'false',
};

export default (state = INITIAL_STATE, action) => {     
    switch (action.type) {   
        case EMAIL_CHANGED: 
            return {...state, email: action.payload};
        case PASSWORD_CHANGED: 
            return {...state, password: action.payload};
        case LOGIN_USER_SUCCESS:
            return {...state, user: action.payload, ...INITIAL_STATE, loggedin: 'true'};
        case LOGIN_USER_FAIL:
            return {...state, error: 'Authentication Failed.',  loading: false, loggedin: 'false'};
        case LOGIN_USER: 
            return {...state, loading: true, error: ''};
        case LOGIN_USER_FACEBOOK:
            return {...state, loading: true, error: ''};
        case CREATE_USER: 
            return {...state, loading: true, error: ''};
        default: 
            return state;
    }
};
