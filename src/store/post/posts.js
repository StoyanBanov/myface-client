import { createSlice } from "@reduxjs/toolkit"
import { apiCallBegan } from "../api"
import { ENDPOINTS } from "../../constants"

const url = ENDPOINTS.posts

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
            state.list.push(...action.payload.data)
            state.loading = false
        },
        requestFailed: (state) => {
            state.loading = false
        },

        added: (state, action) => {
            state.list = [action.payload.data]
            state.loading = false
        },

        removed: (state) => {
            return posts.getInitialState()
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
export const getPosts = () =>
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