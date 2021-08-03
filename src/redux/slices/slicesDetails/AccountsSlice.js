import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    accountList: [
        {
            "id": "1",
            "username": "admin",
            "email": "admin@gmail.com",
            "password": "123"
          },
          {
            "id": "2",
            "username": "dfben",
            "email": "dfben@gmail.com",
            "password": "456"
          }
    ]
}

const accountSlices = createSlice({
    name: 'AccountSlice',
    initialState: initialState,
    reducers: {
        addNewAccounts (state, action) {
            state.accountList.push(action.payload)
        }
    } 
})

const { actions, reducer } = accountSlices;
export { actions as AccountAction, reducer as AccountReducer}