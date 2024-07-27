export const getAuthData = () => JSON.parse(localStorage.getItem('auth')) || {}

export const setAuthData = (data) => data && localStorage.setItem('auth', JSON.stringify(data))

export const clearAuthData = () => localStorage.removeItem('auth')