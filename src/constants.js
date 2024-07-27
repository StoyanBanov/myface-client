export const ENDPOINTS = {
    auth: {
        login: '/auth/login',
        logout: '/auth/logout',

        register: '/auth/register',
        changePassword: '/auth/change-password',
        delete: '/auth/delete',
        verify: '/auth/verify',

        edit: '/auth'
    },

    users: '/users',
    friends: {
        request: '/users/request-friend',
        accept: '/users/accept-friend',
        remove: '/users/remove-friend'
    },

    chats: '/chats',
    messages: '/chats/messages',

    posts: '/posts'
}

export const MAX_MESSAGES_SKIP = 10

export const CDN_ADDRESS = 'http://res.cloudinary.com/depbmnbhc/image/upload'
export const CDN_THUMBNAIL_ADDRESS = CDN_ADDRESS + '/t_Thumbnail'
export const CDN_AVATAR_ADDRESS = CDN_ADDRESS + '/t_Profile'
export const CDN_DEFAULT_AVATAR_NAME_MALE = 'default-no-profile-male_tfth7r'
export const CDN_DEFAULT_AVATAR_NAME_FEMALE = 'default-no-profile-female_enfnx0'

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/jfif']