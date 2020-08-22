export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const SELECT_ONE_BUSINESS = 'SELECT_ONE_BUSINESS';

const initialState = {
    business: [],
    oneBusiness: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_CATEGORIES:
            return { ...state, business: action.payload }
        case SELECT_ONE_BUSINESS:
            return { ...state, oneBusiness: action.payload }
        default:
            return state
    }
}

