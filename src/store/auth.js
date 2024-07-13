import { createSlice } from "@reduxjs/toolkit"
import { apiCallBegan } from "./api"

const endpoints = {
    login: '/auth/login',
    register: '/auth/register',
    verifyRegister: '/auth/verify-register'
}

const auth = createSlice({
    name: 'auth',
    initialState: {
        data: {},
        loading: false
    },
    reducers: {
        requested: (state) => {
            state.loading = true
        },
        received: (state, action) => {
            state.data = action.payload
            state.loading = false
        },
        sentRegisterData: (state, action) => {
            state.data = { ...action.payload, verified: false }
            state.loading = false
        },
        verified: (state) => {
            state.data.verified = true
        },
        requestFailed: (state) => {
            state.loading = false
        },
        removed: (state) => {
            state = this.initialState
        }
    }
})

export default auth.reducer

const { requested, requestFailed, received, sentRegisterData, verified } = auth.actions

// Action Creators
export const login = (body) =>
    apiCallBegan({
        url: endpoints.login,
        method: 'post',
        body,
        onStart: requested.type,
        onSuccess: received.type,
        onError: requestFailed.type
    })

export const register = (body) =>
    apiCallBegan({
        url: endpoints.register,
        method: 'post',
        body,
        onStart: requested.type,
        onSuccess: sentRegisterData.type,
        onError: requestFailed.type
    })

export const verifyRegister = (body) =>
    apiCallBegan({
        url: endpoints.verifyRegister,
        method: 'post',
        body,
        onStart: requested.type,
        onSuccess: verified.type,
        onError: requestFailed.type
    })