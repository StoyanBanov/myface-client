import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { ENDPOINTS } from "../constants";

const endpoints = ENDPOINTS.auth

const auth = createSlice({
    name: 'auth',
    initialState: {
        data: {},
        loading: true
    },
    reducers: {
        initialized: (state, action) => {
            state.data = action.payload
            state.loading = false
        },

        requested: (state) => {
            state.loading = true
        },
        received: (state, action) => {
            state.data = action.payload.data
            state.loading = false
        },
        requestFailed: (state) => {
            state.loading = false
        },

        sentRegisterData: (state, action) => {
            state.data = { ...action.payload.data, notVerified: true }
            state.loading = false
        },

        sentDataForVerification: (state) => {
            state.data.notVerified = true
            state.loading = false
        },
        verified: (state, action) => {
            state.data = action.payload.data
            state.loading = false
        },

        cleared: (state) => {
            state.data = {}
            state.loading = false
        }
    }
})

export default auth.reducer


// Actions

const {
    initialized,

    requested,
    requestFailed,
    received,

    sentRegisterData,

    sentDataForVerification,

    verified,
    cleared
} = auth.actions

export {
    received,
    verified
}



// Action Creators

export const initialize = (data) =>
    initialized(data)

export const login = (body) =>
    apiCallBegan({
        url: endpoints.login,
        method: 'post',
        body,
        onStart: requested.type,
        onSuccess: received.type,
        onError: requestFailed.type
    })

export const logout = () =>
    apiCallBegan({
        url: endpoints.logout,
        onStart: requested.type,
        onSuccess: cleared.type,
        onError: cleared.type
    })

export const clear = () =>
    cleared()

export const edit = (body) =>
    apiCallBegan({
        url: endpoints.edit,
        method: 'put',
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

export const changePassword = (body) =>
    apiCallBegan({
        url: endpoints.changePassword,
        method: 'put',
        body,
        onStart: requested.type,
        onSuccess: sentDataForVerification.type,
        onError: requestFailed.type
    })

export const del = () =>
    apiCallBegan({
        url: endpoints.delete,
        method: 'delete',
        onStart: requested.type,
        onSuccess: sentDataForVerification.type,
        onError: requestFailed.type
    })

export const verify = (body) =>
    apiCallBegan({
        url: endpoints.verify,
        method: 'post',
        body,
        onStart: requested.type,
        onSuccess: verified.type,
        onError: requestFailed.type
    })