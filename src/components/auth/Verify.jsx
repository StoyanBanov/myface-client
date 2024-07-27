import { useState } from "react"
import { useDispatch } from "react-redux"
import { verify } from "../../store/auth"
import FormInput from "../helpers/components/form/FormInput"

const Verify = () => {
    const [code, setCode] = useState('')

    const dispatch = useDispatch()

    const onChange = ({ target: { value } }) => {
        setCode(value)
    }

    const onSubmit = e => {
        e.preventDefault()
        dispatch(verify({ code }))
    }

    return (
        <form onSubmit={onSubmit}>
            <FormInput label={'Code'} id={'code'} name={'code'} value={code} onValueChange={onChange} />

            <button>Submit</button>
        </form>
    )
}

export default Verify