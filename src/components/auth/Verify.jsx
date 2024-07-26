import { useState } from "react"
import { useDispatch } from "react-redux"
import { verifyRegister } from "../../store/auth"
import FormInput from "../helpers/components/formInput/FormInput"

const Verify = () => {
    const [code, setCode] = useState('')

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
            <FormInput label={'Code'} id={'code'} name={'code'} value={code} onChange={onChange} />

            <button>Submit</button>
        </form>
    )
}

export default Verify