import { configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import logger from 'redux-logger'

import RootReducer from '../slices/RootReducer'

const middleware = 
    process.env.NODE_ENV === 'development'
        ? [...getDefaultMiddleware(), logger]
        : [...getDefaultMiddleware()];

const store = configureStore({
    reducer: RootReducer,
    middleware
});

export default store