import { combineReducers } from '@reduxjs/toolkit'
import posts from './post/posts'
import chats from './chat/chats'
import messages from './chat/messages'
import users from './users'

export default combineReducers({
    posts,
    chats,
    messages,
    users,
})