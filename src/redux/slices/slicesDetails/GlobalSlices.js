import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    username: '',
    password: '', 
    isLoading: false,
    countryId: '', 
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
        toggleLoading (state, action) {
            state.isLoading = action.payload
        },
        getCountryId (state, action) {
            state.countryId = action.payload
        }
    } 
})

const { actions, reducer } = globalSlice;
export { actions as GlobalActions, reducer as GlobalReducer}