import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    quotation: {},
    fill: { one: false, two: false, three: false, validation: true }
}

export const quotationSlice = createSlice({
    name: 'quotation',
    initialState,
    reducers: {
        reset: (state) => {
            state.quotation = {}
            state.fill = { one: false, two: false, three: false, validation: true }
        },
        setInitial: (state, action) => { //For Quotation
            state.quotation = {
                ...action.payload
            }
        },
        setQuotationInput: (state, action) => {    //For Quotation
            state.quotation = {
                ...state.quotation,
                ...action.payload
            }
        },
        setFill: (state, action) => {
            state.fill = {
                ...state.fill,
                ...action.payload
            }
        }
    }
})


export const { reset, setQuotationInput, setInitial, setFill } = quotationSlice.actions;
export default quotationSlice.reducer