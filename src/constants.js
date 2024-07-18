export const HOST = 'http://localhost:3000'

export const ENDPOINTS = {
    auth: {
        login: '/auth/login',
        register: '/auth/register',
        verifyRegister: '/auth/verify-register',
        logout: '/auth/logout'
    },

    users: '/users',

    chats: '/chats',
    messages: '/chats/messages',

    posts: '/posts'
}

export const MAX_MESSAGES_SKIP = 10