import { createSlice } from "@reduxjs/toolkit"
import { apiCallBegan } from "../api"
import { ENDPOINTS } from "../../constants"

const url = ENDPOINTS.posts
const ownUrl = ENDPOINTS.ownPosts
const likesUrl = ENDPOINTS.postLikes

const posts = createSlice({
    name: 'posts',
    initialState: {
        list: [],
        skip: 0,
        loading: false,
        lastDeletedId: ''
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
        removed: (state, action) => {
            state.list.splice(state.list.findIndex(p => p._id == action.payload.post), 1)

            state.skip--
            state.lastDeletedId = action.payload.post

            state.loading = false
        },

        likeAdded: (state, action) => {
            const post = state.list.find(p => p._id == action.payload.post)

            post.likesCount++
            post.isLiked = true

            state.loading = false
        },
        likeRemoved: (state, action) => {
            const post = state.list.find(p => p._id == action.payload.post)

            post.likesCount--
            post.isLiked = false

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
    removed,

    likeAdded,
    likeRemoved,

    cleared
} = posts.actions

export default posts.reducer

// Action Creators
export const getPosts = (search) =>
    (dispatch, getState) => {
        dispatch(
            apiCallBegan({
                url: `${url}?orderBy=${encodeURIComponent('"createdAt=-1"')}&skip=${getState().entities.posts.skip}${search ? `&search=${search}` : ''}`,
                onStart: requested.type,
                onSuccess: received.type,
                onError: requestFailed.type
            })
        )
    }

export const getPostsById = (post) =>
    apiCallBegan({
        url: `${url}/${post}`,
        onStart: requested.type,
        onSuccess: added.type,
        onError: requestFailed.type
    })


export const getOwnPosts = () =>
    (dispatch, getState) => {
        dispatch(
            apiCallBegan({
                url: `${ownUrl}?orderBy=${encodeURIComponent('"createdAt=-1"')}&skip=${getState().entities.posts.skip}`,
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

export const editPostById = (post, body) =>
    apiCallBegan({
        url: `${url}/${post}`,
        method: 'put',
        body,
        onStart: requested.type,
        onSuccess: added.type,
        onError: requestFailed.type
    })


export const deletePostById = (post) =>
    apiCallBegan({
        url: `${url}/${post}`,
        method: 'delete',
        onStart: requested.type,
        onSuccess: removed.type,
        onError: requestFailed.type,
        persist: { post }
    })



export const clearPosts = () =>
    cleared()


export const addLikeToPost = (body) =>
    apiCallBegan({
        url: likesUrl,
        method: 'post',
        body,
        onStart: requested.type,
        onSuccess: likeAdded.type,
        onError: requestFailed.type,
        persist: { post: body.post }
    })

export const deleteLikeFromPost = (post) =>
    apiCallBegan({
        url: `${likesUrl}/${post}`,
        method: 'delete',
        onStart: requested.type,
        onSuccess: likeRemoved.type,
        onError: requestFailed.type,
        persist: { post }
    })