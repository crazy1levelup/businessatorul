import { USER_AUTHENTICATED, AUTH_LOADING, AUTH_ERROR, USER_LOGOUT, BUTTON_LOADING } from '../reducers/authReducer'
import trackerApi from '../../api/tracker';
import AsyncStorage from '@react-native-community/async-storage'

export const register = (email, password) => async dispatch => {
    dispatch({ type: BUTTON_LOADING, payload: true });
    try {
        const response = await trackerApi.post('/users/register', { email, password });

        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: USER_AUTHENTICATED, payload: response.data });
        dispatch({ type: AUTH_LOADING, payload: false });
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: e.response.data.error })
    }
}

export const login = (email, password) => async dispatch => {
    dispatch({ type: BUTTON_LOADING, payload: true });
    try {
        const response = await trackerApi.post('/users/login', { email, password });
        console.log(response)
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: USER_AUTHENTICATED, payload: response.data });
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: "Username or password is incorrect" })
    }
}

export const tryLocalSignin = () => async dispatch => {
    const token = await AsyncStorage.getItem('token');
    try {

        if (token) {
        const user = await trackerApi.get('/users/me')

            dispatch({ type: USER_AUTHENTICATED, payload: { token, user: user.data } });
        } else {
            dispatch({ type: AUTH_LOADING, payload: false });
        }
    } catch (e) {
        console.log(e)
        dispatch({ type: AUTH_LOADING, payload: false });

    }
}

export const logout = () => async dispatch => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await trackerApi.post('/users/logout', { token });

        await AsyncStorage.removeItem('token');
        dispatch({ type: USER_LOGOUT })
    } catch (e) {
        console.log(e)
    }
}

export const clearErrorMessage = () => async dispatch => {
    dispatch({ type: AUTH_ERROR, payload: '' })
}
