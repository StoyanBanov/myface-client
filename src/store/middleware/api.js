import { HOST } from '../../constants'
import * as actions from '../api'

export default ({ dispatch, getState }) => next => async action => {
    if (action.type != actions.apiCallBegan.type) return next(action)

    const { url, method = 'get', body, onStart, onSuccess, onError, persist } = action.payload

    if (onStart) dispatch({ type: onStart, payload: { ...persist } })

    next(action)

    const options = {
        method,
        headers: {}
    }

    if (body) {
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(body)
    }

    const { token } = getState().auth.data
    if (token) options.headers.authorization = token

    try {
        const request = await fetch(HOST + url, options)

        const data = request.status != 204 && await request.json()

        if (!request.ok) throw new Error(data)

        dispatch(actions.apiCallSucceeded(data))

        if (onSuccess) dispatch({ type: onSuccess, payload: { data, ...persist } })
    } catch (error) {
        console.log(error);

        dispatch(actions.apiCallFailed(error.message))

        if (onError) dispatch({ type: onError, payload: { message: error.message, ...persist } })
    }
}