import { useState } from "react"
import FormInput from "../helpers/components/form/FormInput"
import FormTemplate from "../helpers/components/form/FormTemplate"
import { useDispatch } from "react-redux"
import { changePassword, del } from "../../store/auth"

const Settings = ({ user }) => {
    const [value, setValue] = useState('')

    const dispatch = useDispatch()

    const onChange = e => {
        setValue(e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault()

        dispatch(changePassword({ password: value }))
    }

    const onDelete = () => {
        dispatch(del())
    }

    return (
        <>
            <FormTemplate title={'Change Password'} btnTxt={'Change'} onSubmit={onSubmit}>
                <FormInput id={'password'} name={'password'} label={'New Password'} value={value} onValueChange={onChange} />
            </FormTemplate>

            <button onClick={onDelete}>Delete Account</button>
        </>
    )
}

export default Settings