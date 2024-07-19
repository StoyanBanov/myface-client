import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { ENDPOINTS } from "../constants";

const url = ENDPOINTS.chats

const chats = createSlice({
    name: 'chats',
    initialState: {
        available: {
            list: [],
            loading: false
        },
        open: [],
    },
    reducers: {
        availableRequested: (state) => {
            state.available.loading = true
        },
        availableReceived: (state, action) => {
            state.available.list.push(...action.payload.data)
            state.available.loading = false
        },
        availableFailed: (state) => {
            state.available.loading = false
        },
        availableRemoved: (state) => {
            state.available.list = []
        },

        openAdded: (state, action) => {
            state.open.push({
                chat: state.available.list.find(c => c._id == action.payload),
                loading: false
            })
        },
        openRemoved: (state, action) => {
            state.open = state.open.filter(c => c.chat._id != action.payload)
        },

        openRequested: (state, action) => {
            state.open.push({
                chat: {
                    _id: action.payload.chat
                },
                loading: true
            })
        },
        openAddedFromRequest: (state, action) => {
            const chatObj = state.open.find(c => c.chat._id == action.payload.data.chat._id)
            chatObj.chat = action.payload.data.chat
            chatObj.loading = false
        },
        openFailed: (state, action) => {
            state.open = state.open.filter(c => c.chat._id != action.payload.chat)
        },
    }
})

export default chats.reducer


// Actions

const {
    openAdded,
    openRemoved,

    openRequested,
    openAddedFromRequest,
    openFailed,

    availableRequested,
    availableReceived,
    availableFailed,
    availableRemoved
} = chats.actions


// Action creators

export const openChat = (chat) =>
    openAdded(chat)

export const getChat = (chat) =>
    apiCallBegan({
        url: `${url}/${chat}`,
        onStart: openRequested.type,
        onSuccess: openAddedFromRequest.type,
        onError: openFailed.type,
        persist: { chat }
    })

export const getChats = () =>
    apiCallBegan({
        url,
        onStart: availableRequested.type,
        onSuccess: availableReceived.type,
        onError: availableFailed.type
    })

export const removeChats = () =>
    availableRemoved()

export const removeChat = (chat) =>
    openRemoved(chat)