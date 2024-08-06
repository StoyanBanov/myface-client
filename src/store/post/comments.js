import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";
import { DEFAULT_SKIP, ENDPOINTS } from "../../constants";

const url = ENDPOINTS.postComments

const comments = createSlice({
    name: 'comments',
    initialState: {
        list: [],
        skip: 0,
        hasReceivedAll: false,
        loading: false
    },
    reducers: {
        requested: (state) => {
            state.loading = true
        },
        received: (state, action) => {
            const comments = action.payload.data

            state.list.push(...comments)

            state.skip += comments.length

            if (comments.length < DEFAULT_SKIP)
                state.hasReceivedAll = true

            state.loading = false
        },
        requestFailed: (state) => {
            state.loading = false
        },

        added: (state, action) => {
            state.list.unshift(action.payload.data)
            state.skip++
            state.loading = false
        },
        removed: (state, action) => {
            state.list.splice(state.list.findIndex(c => c._id == action.payload.comment), 1)
            state.skip--
            state.loading = false
        },

        cleared: () => comments.getInitialState()
    }
})

export default comments.reducer


// ACtions
const {
    requested,
    received,
    requestFailed,

    added,
    removed,

    cleared
} = comments.actions


// Action Creators
export const getComments = (postId) =>
    (dispatch, getState) => {
        dispatch(
            apiCallBegan({
                url: `${url}/${postId}?orderBy=${encodeURIComponent('"createdAt=-1"')}&skip=${getState().entities.comments.skip}`,
                onStart: requested.type,
                onSuccess: received.type,
                onError: requestFailed.type
            })
        )
    }

export const addComment = (body) =>
    apiCallBegan({
        url,
        method: 'post',
        body,
        onStart: requested.type,
        onSuccess: added.type,
        onError: requestFailed.type
    })

export const deleteCommentById = (comment) =>
    apiCallBegan({
        url: `${url}/${comment}`,
        method: 'delete',
        onStart: requested.type,
        onSuccess: removed.type,
        onError: requestFailed.type,
        persist: { comment }
    })

export const clearComments = () => cleared()