export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const AUTH_LOADING = 'AUTH_LOADING';
export const AUTH_ERROR = 'AUTH_ERROR';
export const USER_LOGOUT = 'USER_LOGOUT';
export const BUTTON_LOADING = 'BUTTON_LOADING';

const initialState = {
    user: {},
    loading: true,
    errorMessage: '',
    token: null,
    buttonLoading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_AUTHENTICATED:
            return { ...state, user: action.payload.user, token: action.payload.token, loading: false, buttonLoading: false }
        case AUTH_LOADING:
            return { ...state, loading: action.payload }
        case AUTH_ERROR:
            return { ...state, errorMessage: action.payload, loading: false, buttonLoading: false }
        case USER_LOGOUT:
            return { user: {}, loading: false, errorMessage: '', token: null }
        case BUTTON_LOADING:
            return { ...state, buttonLoading: action.payload }
        default:
            return state
    }
}

