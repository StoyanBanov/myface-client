import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { getChat } from "./chats";
import { ENDPOINTS } from "../constants";

const url = ENDPOINTS.messages

const messages = createSlice({
    name: 'messages',
    initialState: {},
    reducers: {
        appended: (state, action) => {
            const chat = state[action.payload.chat]

            chat.messages.push(action.payload)
            chat.skip++
        },

        requested: (state, action) => {
            const chat = state[action.payload.chat]

            if (chat) chat.loading = true
            else state[action.payload.chat] = {
                messages: [],
                skip: 0,
                loading: true
            }
        },
        received: (state, action) => {
            const chat = state[action.payload.chat]

            chat.messages = action.payload.data.reverse().concat(chat.messages)
            chat.skip += action.payload.data.length
            chat.loading = false
        },
        failed: (state, action) => {
            state[action.payload.chat].loading = false
        },

        added: (state, action) => {
            const chat = state[action.payload.chat]

            chat.messages.push(action.payload.data)
            chat.skip++
            chat.loading = false
        },

        chatRemoved: (state, action) => {
            delete state[action.payload]
        }
    }
})

export default messages.reducer

const { requested,
    received,
    failed,

    added,

    chatRemoved,

    appended
} = messages.actions

// Action creators

export const addMessage = (body) =>
    apiCallBegan({
        url,
        method: 'post',
        body,
        onStart: requested.type,
        onSuccess: added.type,
        onError: failed.type,
        persist: { chat: body.chat }
    })

export const getMessages = (chat, { skip = 0, limit = 10 } = {}) =>
    apiCallBegan({
        url: `${url}/${chat}?orderBy=${encodeURIComponent('"createdAt=-1"')}&skip=${skip}&limit=${limit}`,
        onStart: requested.type,
        onSuccess: received.type,
        onError: failed.type,
        persist: { chat }
    })

export const appendMessage = (message) =>
    (dispatch, getState) => {
        getState().entities.chats.open.find(c => c.chat._id == message.chat)
            ? dispatch(appended(message))
            : dispatch(getChat(message.chat))
    }

export const removeMessages = (chat) =>
    chatRemoved(chat)