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


        repliesReceived: (state, action) => {
            const { parents } = action.payload

            let comment = state.list.find(c => c._id == parents.pop())

            while (parents.length) {
                const parent = parents.pop()
                comment = comment.replies.find(c => c._id == parent)
            }

            const replies = action.payload.data

            if (comment.replies) {
                comment.replies.unshift(...replies)
                comment.repliesSkip += replies.length
            } else {
                comment.replies = replies
                comment.repliesSkip = replies.length
            }

            state.loading = false
        },
        replyAdded: (state, action) => {
            const { parents } = action.payload

            let comment = state.list.find(c => c._id == parents.pop())

            while (parents.length) {
                const parent = parents.pop()
                comment = comment.replies.find(c => c._id == parent)
            }

            const reply = action.payload.data

            if (comment.replies) {
                comment.replies.unshift(reply)
                comment.repliesSkip++
            } else {
                comment.replies = [reply]
                comment.repliesSkip = 1
            }

            state.loading = false
        },
        replyRemoved: (state, action) => {
            const { parents } = action.payload

            let comment = state.list.find(c => c._id == parents.pop())

            while (parents.length) {
                const parent = parents.pop()
                comment = comment.replies.find(c => c._id == parent)
            }

            comment.replies.splice(comment.replies.findIndex(c => c._id == action.payload.comment), 1)
            comment.repliesSkip--

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

    repliesReceived,
    replyAdded,
    replyRemoved,

    cleared
} = comments.actions


// Action Creators
export const getComments = (post) =>
    (dispatch, getState) => {
        dispatch(
            apiCallBegan({
                url: `${url}?where=${encodeURIComponent(`"post=${post}"`)}&orderBy=${encodeURIComponent('"createdAt=-1"')}&skip=${getState().entities.comments.skip}`,
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


export const getReplies = (commentObj, parents) =>
    apiCallBegan({
        url: `${url}?where=${encodeURIComponent(`"comment=${commentObj._id}"`)}&orderBy=${encodeURIComponent('"createdAt=-1"')}&skip=${commentObj.skip}`,
        onStart: requested.type,
        onSuccess: repliesReceived.type,
        onError: requestFailed.type,
        persist: { parents }
    })

export const addReply = (body, parents) =>
    apiCallBegan({
        url,
        method: 'post',
        body,
        onStart: requested.type,
        onSuccess: replyAdded.type,
        onError: requestFailed.type,
        persist: { parents }
    })

export const deleteReply = (comment, parents) =>
    apiCallBegan({
        url: `${url}/${comment}`,
        method: 'delete',
        onStart: requested.type,
        onSuccess: replyRemoved.type,
        onError: requestFailed.type,
        persist: { parents }
    })

export const clearComments = () => cleared()