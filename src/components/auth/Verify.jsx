import { useState } from "react"
import { useDispatch } from "react-redux"
import { verifyRegister } from "../../store/auth"
import { useSetAuthData } from "../helpers/customHooks/useSetAuthData"

const Verify = () => {
    const [code, setCode] = useState('')

    useSetAuthData()

    const dispatch = useDispatch()

    const onChange = ({ target: { value } }) => {
        setCode(value)
    }

    const onSubmit = e => {
        e.preventDefault()
        dispatch(verifyRegister({ code }))
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="code">
                Code
                <input id="code" name="code" value={code} onChange={onChange} />
            </label>
        </form>
    )
}

export default Verify