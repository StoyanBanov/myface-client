import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";
import { ENDPOINTS } from "../../constants";
import { clearChats } from "./messages";

const url = ENDPOINTS.chats

const chats = createSlice({
    name: 'chats',
    initialState: {
        available: {
            list: [],
            loading: false,
            skip: 0
        },
        open: [],
    },
    reducers: {
        availableRequested: (state) => {
            state.available.loading = true
        },
        availableReceived: (state, action) => {
            state.available.list.push(...action.payload.data)
            state.available.skip += action.payload.data.length
            state.available.loading = false
        },
        availableFailed: (state) => {
            state.available.loading = false
        },
        availableCleared: (state) => {
            state.available.list = []
            state.available.skip = 0
        },

        openAdded: (state, action) => {
            if (!state.open.find(c => c.chat._id == action.payload.chat)) {
                const newChat = {
                    chat: state.available.list.find(c => c._id == action.payload.chat),
                    loading: false
                }

                if (action.payload.windowWidth / 400 > state.open.length + 1) {
                    state.open.push(newChat)
                } else {
                    state.open.pop()
                    state.open.unshift(newChat)
                }
            }
        },
        openRemoved: (state, action) => {
            state.open = state.open.filter(c => c.chat._id != action.payload)
        },
        openCleared: (state) => {
            state.open = []
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
        }
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
    openCleared,

    availableRequested,
    availableReceived,
    availableFailed,
    availableCleared
} = chats.actions


// Action creators

export const openChat = (chat, windowWidth) =>
    openAdded({ chat, windowWidth })

export const getChat = (chat) =>
    apiCallBegan({
        url: `${url}/${chat}`,
        onStart: openRequested.type,
        onSuccess: openAddedFromRequest.type,
        onError: openFailed.type,
        persist: { chat }
    })

export const getChats = () =>
    (dispatch, getState) => {
        dispatch(
            apiCallBegan({
                url: `${url}?skip=${getState().entities.chats.available.skip}`,
                onStart: availableRequested.type,
                onSuccess: availableReceived.type,
                onError: availableFailed.type
            })
        )
    }

export const clearAvailableChats = () =>
    availableCleared()

export const removeChat = (chat) =>
    openRemoved(chat)

export const clearOpenChats = () =>
    (dispatch) => {
        dispatch(openCleared())
        dispatch(clearChats())
    }