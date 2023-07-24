import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";

export interface IMessageState {
    text: string
    severity: 'success' | 'info' | 'warning' | 'error'
    redirect?: string
}

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        text: undefined,
        severity: undefined,
        redirect: undefined,
    },
    reducers: {
        setMessage: (state: Draft<IMessageState>, action: PayloadAction<IMessageState>) => {
            state.text = action.payload.text
            state.severity = action.payload.severity
            state.redirect = action.payload.redirect
        }
    }
})

export const {setMessage} = messageSlice.actions

export default messageSlice.reducer
