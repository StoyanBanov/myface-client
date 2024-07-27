import { setAuthData } from "../../util/session"
import { received, verified } from "../auth"

export default () => next => async (action) => {
    if (action.type == received.type || action.type == verified.type)
        setAuthData(action.payload.data)

    next(action)
}