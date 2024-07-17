import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { getChat } from "./chats";

const url = '/chats/messages'

const messages = createSlice({
    name: 'messages',
    initialState: {},
    reducers: {
        appendedMessage: (state, action) => {
            state[action.payload.chat].messages.push(action.payload)
        },

        messagesRequested: (state, action) => {
            const chat = state[action.payload.chat]

            if (chat) chat.loading = true
            else state[action.payload.chat] = {
                messages: [],
                loading: true
            }
        },
        messagesReceived: (state, action) => {
            const chat = state[action.payload.chat]

            chat.messages = action.payload.data.reverse().concat(chat.messages)
            chat.loading = false
        },
        messagesFailed: (state, action) => {
            state[action.payload.chat].loading = false
        },

        messageAdded: (state, action) => {
            const chat = state[action.payload.chat]

            chat.messages.push(action.payload.data)
            chat.loading = false
        }
    }
})

export default messages.reducer

const { messagesRequested,
    messagesReceived,
    messagesFailed,

    messageAdded,

    appendedMessage
} = messages.actions

// Action creators

export const addMessage = (body) =>
    apiCallBegan({
        url,
        method: 'post',
        body,
        onStart: messagesRequested.type,
        onSuccess: messageAdded.type,
        onError: messagesFailed.type,
        persist: { chat: body.chat }
    })

export const getMessages = (chat, { skip = 0, limit = 10 } = {}) =>
    apiCallBegan({
        url: `${url}/${chat}?orderBy=${encodeURIComponent('"createdAt=-1"')}&skip=${skip}&limit=${limit}`,
        onStart: messagesRequested.type,
        onSuccess: messagesReceived.type,
        onError: messagesFailed.type,
        persist: { chat }
    })

export const appendMessage = (message) =>
    (dispatch, getState) => {
        getState().entities.chats.open.find(c => c.chat._id == message.chat)
            ? dispatch(appendedMessage(message))
            : dispatch(getChat(message.chat))
    }