import { combineReducers } from '@reduxjs/toolkit'
import posts from './post/posts'
import chats from './chat/chats'
import messages from './chat/messages'
import users from './users'
import comments from './post/comments'

export default combineReducers({
    posts,
    comments,
    chats,
    messages,
    users,
})