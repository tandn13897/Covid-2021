import { combineReducers } from 'redux'
import { GlobalReducer} from './slicesDetails/GlobalSlices'
import { AccountReducer } from './slicesDetails/AccountsSlice'

const RootReducer = combineReducers({
    GlobalReducer,
    AccountReducer
})

export default RootReducer