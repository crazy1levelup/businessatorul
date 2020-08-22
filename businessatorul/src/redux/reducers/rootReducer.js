import { combineReducers } from 'redux'
import authReducer from './authReducer'
import businessReducer from './businessReducer'
import reservationReducer from './reservationReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    business: businessReducer,
    reservation: reservationReducer
})

export default rootReducer;