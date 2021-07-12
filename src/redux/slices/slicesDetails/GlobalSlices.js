import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    username: '',
    password: '', 
    error: '',
    isLoading: false, 
}

const globalSlice = createSlice({
    name: 'globalSlice',
    initialState: initialState,
    reducers: {
        getUserName (state, action) {
            state.username = action.payload
        },
        getUserPassword (state, action) {
            state.password = action.payload
        },
        getError (state, action) {
            state.error = action.payload
        },
        toggleLoading (state, action) {
            state.isLoading = action.payload
        },
    } 
})

const { actions, reducer } = globalSlice;
export { actions as GlobalActions, reducer as GlobalReducer}