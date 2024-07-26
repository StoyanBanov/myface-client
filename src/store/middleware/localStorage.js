import { setAuthData } from "../../util/session"
import { received } from "../auth"

export default () => next => async (action) => {
    if (action.type == received.type)
        setAuthData(action.payload.data)

    next(action)
}