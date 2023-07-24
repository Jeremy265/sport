import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import menuReducer from './slices/menuSlice'
import messageReducer from './slices/messageSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        menu: menuReducer,
        message: messageReducer
    }
})