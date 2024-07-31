import { createSlice } from "@reduxjs/toolkit"
import { apiCallBegan } from "../api"
import { ENDPOINTS } from "../../constants"

const url = ENDPOINTS.posts
const ownUrl = ENDPOINTS.ownPosts

const posts = createSlice({
    name: 'posts',
    initialState: {
        list: [],
        skip: 0,
        loading: false
    },
    reducers: {
        requested: (state) => {
            state.loading = true
        },
        received: (state, action) => {
            const posts = action.payload.data

            state.list.push(...posts)
            state.skip += posts.length
            state.loading = false
        },
        requestFailed: (state) => {
            state.loading = false
        },

        added: (state, action) => {
            state.list = [action.payload.data]
            state.skip = 1
            state.loading = false
        },

        cleared: () => posts.getInitialState()
    }
})

const {
    requested,
    received,
    requestFailed,
    added,

    cleared
} = posts.actions

export default posts.reducer

// Action Creators
export const getPosts = (search) =>
    (dispatch, getState) => {
        dispatch(
            apiCallBegan({
                url: `${url}?skip=${getState().entities.posts.skip}${search ? `&search=${search}` : ''}`,
                onStart: requested.type,
                onSuccess: received.type,
                onError: requestFailed.type
            })
        )
    }

export const getPostsById = (id) =>
    apiCallBegan({
        url: `${url}/${id}`,
        onStart: requested.type,
        onSuccess: added.type,
        onError: requestFailed.type
    })


export const getOwnPosts = () =>
    (dispatch, getState) => {
        dispatch(
            apiCallBegan({
                url: `${ownUrl}?skip=${getState().entities.posts.skip}`,
                onStart: requested.type,
                onSuccess: received.type,
                onError: requestFailed.type
            })
        )
    }

export const addPost = (body) =>
    apiCallBegan({
        url,
        method: 'post',
        body,
        onStart: requested.type,
        onSuccess: added.type,
        onError: requestFailed.type
    })

export const clearPosts = () =>
    cleared()