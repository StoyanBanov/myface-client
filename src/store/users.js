import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { ENDPOINTS } from "../constants";

const urlUsers = ENDPOINTS.users
const urlFriendships = ENDPOINTS.friendships

const users = createSlice({
    name: 'users',
    initialState: {
        current: {},
        list: [],
        skip: 0,
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
            const users = action.payload.data

            state.list.push(...users)
            state.skip += users.length
            state.loading = false
        },
        requestFailed: (state) => {
            state.loading = false
        },

        friendRequested: (state, action) => {
            const friend = state.list.find(u => u._id == action.payload.data._id)
            friend.outgoingRequest = true

            state.loading = false
        },
        friendAccepted: (state, action) => {
            const friend = state.list.find(u => u._id == action.payload.data._id)

            friend.incomingRequest = false
            friend.friends = true

            state.loading = false
        },
        friendRemoved: (state, action) => {
            const friend = state.list.find(u => u._id == action.payload.data._id)

            friend.outgoingRequest = false
            friend.friends = false

            state.loading = false
        },

        cleared: (state) => {
            state.list = []
            state.skip = 0
        }
    }
})

export default users.reducer


// Actions

const {
    initializedCurrent,

    requested,
    received,
    requestFailed,

    friendRequested,
    friendAccepted,
    friendRemoved,

    cleared
} = users.actions


// Action creators

export const initializeCurrent = (id) =>
    apiCallBegan({
        url: `${urlUsers}/${id}`,
        onStart: requested.type,
        onSuccess: initializedCurrent.type,
        onError: requestFailed.type
    })

export const getUsers = (search) =>
    (dispatch, getState) => {
        dispatch(
            apiCallBegan({
                url: `${urlUsers}?skip=${getState().entities.users.skip}${search ? `&search=${search}` : ''}`,
                onStart: requested.type,
                onSuccess: received.type,
                onError: requestFailed.type
            })
        )
    }

export const clearUsers = () =>
    cleared()



export const getFriends = (search) =>
    (dispatch, getState) => {
        dispatch(
            apiCallBegan({
                url: `${urlFriendships}?skip=${getState().entities.users.skip}&where=${encodeURIComponent(`"isAccepted=true"`)}${search ? `&search=${search}` : ''}`,
                onStart: requested.type,
                onSuccess: received.type,
                onError: requestFailed.type
            })
        )
    }


export const getFriendshipRequests = (search) =>
    (dispatch, getState) =>
        dispatch(apiCallBegan({
            url: `${urlFriendships}?where=${encodeURIComponent(`"isAccepted=false"&"accepted=${getState().entities.users.current._id}"`)}${search ? `&search=${search}` : ''}`,
            onStart: requested.type,
            onSuccess: received.type,
            onError: requestFailed.type
        }))

export const requestFriendship = (body) =>
    apiCallBegan({
        url: urlFriendships,
        method: 'post',
        body,
        onStart: requested.type,
        onSuccess: friendRequested.type,
        onError: requestFailed.type
    })

export const acceptFriendship = (body) =>
    apiCallBegan({
        url: urlFriendships,
        method: 'put',
        body,
        onStart: requested.type,
        onSuccess: friendAccepted.type,
        onError: requestFailed.type
    })

export const removeFriendship = ({ id }) =>
    apiCallBegan({
        url: `${urlFriendships}/${id}`,
        method: 'delete',
        onStart: requested.type,
        onSuccess: friendRemoved.type,
        onError: requestFailed.type
    })