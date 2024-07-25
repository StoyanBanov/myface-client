import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { ENDPOINTS } from "../constants";

const url = ENDPOINTS.users

const users = createSlice({
    name: 'users',
    initialState: {
        current: {},
        list: [],
        loading: false
    },
    reducers: {
        initializedCurrent: (state, action) => {
            state.current = action.payload.data
            state.loading = false
        },

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

        friendAdded: (state, action) => {
            const friendId = action.payload.data._id

            state.current.friends.push(friendId)
            state.list.find(u => u._id == friendId).friends.push(state.current._id)

            state.loading = false
        },
        friendRemoved: (state, action) => {
            const friendId = action.payload.data._id

            state.current.friends = state.current.friends.filter(f => f._id != friendId)

            const friend = state.list.find(u => u._id == friendId)
            friend.friends = friend.friends.filter(u => u._id == state.current._id)

            state.loading = false
        },

        cleared: () => users.getInitialState()
    }
})

export default users.reducer


// Actions

const { initializedCurrent, requested, received, requestFailed, friendAdded, friendRemoved, cleared } = users.actions


// Action creators

export const initializeCurrent = (id) =>
    apiCallBegan({
        url: `${url}/${id}`,
        onStart: requested.type,
        onSuccess: initializedCurrent.type,
        onError: requestFailed.type
    })

export const getUsers = (query = '') =>
    apiCallBegan({
        url: `${url}?${query}`,
        onStart: requested.type,
        onSuccess: received.type,
        onError: requestFailed.type
    })

export const addFriend = (body) =>
    apiCallBegan({
        url,
        method: 'post',
        body,
        onStart: requested.type,
        onSuccess: friendAdded.type,
        onError: requestFailed.type
    })

export const removeFriend = ({ id }) =>
    apiCallBegan({
        url: `${url}/${id}`,
        method: 'delete',
        onStart: requested.type,
        onSuccess: friendRemoved.type,
        onError: requestFailed.type
    })

export const clearUsers = () =>
    cleared()