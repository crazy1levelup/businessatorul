export const FETCH_RESERVATIONS = 'FETCH_RESERVATIONS';
export const ADD_RESERVATION = 'ADD_RESERVATION';
export const LOADING_RESERVATIONS = 'LOADING_RESERVATIONS';
export const UPDATE_RESERVATION = 'UPDATE_RESERVATION';

const initialState = {
    reservations: [],
    loading: true
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_RESERVATIONS:
            return { ...state, reservations: action.payload, loading: false };
        case ADD_RESERVATION:
            return { ...state, reservations: [action.payload, ...state.reservations] };
        case UPDATE_RESERVATION:
            const reser = state.reservations

            const resIndex = reser.findIndex((res) => {
                return res._id === action.payload._id
            })
            console.log(resIndex)
            reser[resIndex] = action.payload

            return { ...state, reservations: [...reser] };
        case LOADING_RESERVATIONS:
            return { ...state, loading: true }
        default:
            return state
    }
}
