import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";

export interface IMenuState {
    current: any
    opened: boolean
}

const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        current: null,
        opened: true,
    },
    reducers: {
        setCurrent: (state: Draft<IMenuState>, action: PayloadAction<any>) => {
            state.current = action.payload
        },
        setOpened: (state: Draft<IMenuState>, action: PayloadAction<boolean>) => {
            state.opened = action.payload
        },
    }
})

export const {setCurrent, setOpened} = menuSlice.actions

export default menuSlice.reducer
