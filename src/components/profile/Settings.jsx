import { useState } from "react"
import FormInput from "../helpers/components/form/FormInput"
import FormTemplate from "../helpers/components/form/FormTemplate"
import { useDispatch } from "react-redux"
import { changePassword, del } from "../../store/auth"
import { getUserErrors, hasErrors, hasUserFieldError } from "../../util/validation"

const Settings = () => {
    const [value, setValue] = useState('')

    const [errors, setErrors] = useState(getUserErrors())

    const dispatch = useDispatch()

    const onChange = e => {
        setValue(e.target.value)
    }

    const onBlur = ({ target: { name, value } }) => {
        setErrors(state => ({
            ...state, [name]: {
                value: hasUserFieldError(name, value),
                hints: [...state[name].hints]
            }
        }))
    }

    const onSubmit = e => {
        e.preventDefault()

        if (!hasErrors(errors))
            dispatch(changePassword({ password: value }))
    }

    const onDelete = () => {
        dispatch(del())
    }

    return (
        <>
            <FormTemplate title={'Change Password'} btnTxt={'Change'} onSubmit={onSubmit}>
                <FormInput id={'password'} name={'password'} label={'New Password'} value={value} error={errors.password} onValueChange={onChange} onBlur={onBlur} />
            </FormTemplate>

            <button onClick={onDelete}>Delete Account</button>
        </>
    )
}

export default Settings