import { HOST } from '../../constants'
import * as actions from '../api'

export default dispatch => next => async action => {
    if (action.type != actions.apiCallBegan.type) return next(action)

    const { url, method = 'get', body, onStart, onSuccess, onError } = action.payload

    if (onStart) dispatch({ type: onStart })

    next(action)

    const options = {
        method,
        headers: {}
    }

    if (body) options.headers.body = JSON.stringify(body)

    const token = ''//getUserData().token
    if (token) options.headers.authorization = token

    try {
        const request = await fetch(HOST + url, options)
        const data = await request.json()

        if (!request.ok) throw new Error(data.message)

        dispatch(actions.apiCallSucceeded(data))

        if (onSuccess) dispatch({ type: onSuccess, payload: data })
    } catch (error) {
        dispatch(actions.apiCallFailed(error.message))

        if (onError) dispatch({ type: onError, payload: error.message })
    }
}