import { createSlice } from "@reduxjs/toolkit"
import { apiCallBegan } from "./api"

const url = '/posts'

const posts = createSlice({
    name: 'posts',
    initialState: {
        list: [],
        loading: false
    },
    reducers: {
        requested: (state) => {
            state.loading = true
        },
        received: (state, action) => {
            state.list = action.payload
            state.loading = false
        },
        requestFailed: (state) => {
            state.loading = false
        },
        added: (state, action) => {
            state.list.push(...action.payload)
        },
        removed: (state) => {
            state = this.initialState
        }
    }
})

const {
    requested,
    received,
    requestFailed,
    added
} = posts.actions

export default posts.reducer

// Action Creators
export const loadPosts = () =>
    apiCallBegan({
        url,
        onStart: requested.type,
        onSuccess: received.type,
        onError: requestFailed.type
    })

export const addPost = (body) =>
    apiCallBegan({
        url,
        method: 'post',
        body,
        onStart: requested.type,
        onSuccess: added.type,
        onError: requestFailed.type
    })