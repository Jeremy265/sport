import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit'
import {IUser} from '../../services/users.service'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        first_name: null,
        last_name: null,
        token: null
    },
    reducers: {
        signInUser: (state: Draft<IUser>, action: PayloadAction<IUser>) => {
            Object.assign(state, action.payload)
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        signOutUser: (state: Draft<IUser>) => {
            state.first_name = null
            state.last_name = null
            state.token = null
            localStorage.removeItem('user')
        },
        signInUserFromLocalStorage: (state: Draft<IUser>) => {
            if (!localStorage.getItem('user'))
                return
            const user = JSON.parse(localStorage.getItem('user'))
            Object.assign(state, user)
            localStorage.setItem('user', JSON.stringify(user))
        }
    }
})

// Action creators are generated for each case reducer function
export const {signInUser, signOutUser, signInUserFromLocalStorage} = userSlice.actions

export default userSlice.reducer