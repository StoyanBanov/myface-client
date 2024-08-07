import { useState } from "react"
import { useDispatch } from "react-redux"
import { verify } from "../../store/auth"
import FormInput from "../helpers/components/form/FormInput"
import { useStatus } from "../helpers/customHooks/useStatus"

const Verify = () => {
    const [code, setCode] = useState('')

    const { data } = useStatus()

    const dispatch = useDispatch()

    const onChange = ({ target: { value } }) => {
        setCode(value)
    }

    const onSubmit = e => {
        e.preventDefault()
        dispatch(verify({ code }))
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ margin: '10px' }}>Please go to {data.email} and copy the code!</p>

            <form onSubmit={onSubmit}>
                <FormInput label={'Code'} id={'code'} name={'code'} value={code} onValueChange={onChange} />

                <button>Submit</button>
            </form>
        </div>
    )
}

export default Verify