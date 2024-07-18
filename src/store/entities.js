import { combineReducers } from '@reduxjs/toolkit'
import posts from './posts'
import chats from './chats'
import messages from './messages'
import users from './users'

export default combineReducers({
    posts,
    chats,
    messages,
    users,
})