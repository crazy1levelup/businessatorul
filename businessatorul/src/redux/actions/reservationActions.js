import { FETCH_RESERVATIONS, ADD_RESERVATION, LOADING_RESERVATIONS, UPDATE_RESERVATION } from '../reducers/reservationReducer'
import trackerApi from '../../api/tracker';
import AsyncStorage from '@react-native-community/async-storage'

export const addReservation = (reservation) => async dispatch => {
    try {
        const response = await trackerApi.post('/add-reservation', reservation);
        console.log(response)
        dispatch({ type: ADD_RESERVATION, payload: response.data })

    } catch (e) {
        console.log(e)
    }
}

export const updateReservation = (reservation) => async dispatch => {
    try {
        console.log(reservation)
        const response = await trackerApi.post('/update-reservation', reservation);
        console.log(response)
        dispatch({ type: UPDATE_RESERVATION, payload: response.data })

    } catch (e) {
        console.log(e)
    }
}

export const getReservations = (businessId, search = '') => async dispatch => {
    if (search === '') {
        dispatch({ type: LOADING_RESERVATIONS })

    }
    try {
        const response = await trackerApi.get(`/reservation?businessId=${businessId}&search=${search}`);
        console.log(response)
        dispatch({ type: FETCH_RESERVATIONS, payload: response.data })

    } catch (e) {
        console.log(e)
        dispatch({ type: LOADING_RESERVATIONS })

    }
}

