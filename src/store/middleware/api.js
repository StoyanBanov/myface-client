const HOST = import.meta.env.VITE_HOST

import { clearAuthData } from '../../util/session'
import * as actions from '../api'
import { clear } from '../auth'

export default ({ dispatch, getState }) => next => async (action) => {
    if (action.type != actions.apiCallBegan.type) return next(action)

    const { url, method = 'get', body, onStart, onSuccess, onError, persist } = action.payload

    if (onStart) dispatch({ type: onStart, payload: { ...persist } })

    next(action)

    const { token } = getState().auth.data

    try {
        const request = await fetch(HOST + url, createOptions(method, body, token))

        const data = request.status != 204 ? await request.json() : {}

        if (!request.ok) throw new Error(data)

        dispatch(actions.apiCallSucceeded(data))

        if (onSuccess) dispatch({ type: onSuccess, payload: { data, ...persist } })
    } catch ({ message }) {
        console.log(message);

        dispatch(actions.apiCallFailed(message))

        if (onError) dispatch({ type: onError, payload: { message, ...persist } })

        if (message == 'Logged out!') {
            clearAuthData()
            dispatch(clear())
        } else alert(message)
    }
}

function createOptions(method, body, token) {
    const options = {
        method,
        headers: {}
    }

    if (body) {
        if (Object.values(body).some(v => v instanceof File || (Array.isArray(v) && v[0] instanceof File))) {
            options.body = toFormData(body)
        } else {
            options.headers['Content-Type'] = 'application/json'
            options.body = JSON.stringify(body)
        }
    }

    if (token) options.headers.authorization = token

    return options
}

function toFormData(body) {
    const formData = new FormData()
    for (const [key, val] of Object.entries(body)) {
        if (Array.isArray(val)) {
            for (const v of val) {
                formData.append(key, v)
            }
        } else if (val) {
            formData.append(key, val)
        }
    }

    return formData
}