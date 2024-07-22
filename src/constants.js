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

export const CDN_ADDRESS = 'http://res.cloudinary.com/depbmnbhc/image/upload'
export const CDN_THUMBNAIL_ADDRESS = CDN_ADDRESS + '/t_Thumbnail'