import { FETCH_CATEGORIES, SELECT_ONE_BUSINESS } from '../reducers/businessReducer'
import trackerApi from '../../api/tracker';
import AsyncStorage from '@react-native-community/async-storage'

export const fetchBusinesses = () => async dispatch => {
    try {
        const response = await trackerApi.get('/business');

        dispatch({ type: FETCH_CATEGORIES, payload: response.data });
    } catch (e) {
        console.log(e)
    }
}

export const selectOneBusiness = (data) => async dispatch => {
    try {
        dispatch({ type: SELECT_ONE_BUSINESS, payload: data });
    } catch (e) {
        console.log(e)
    }
}


