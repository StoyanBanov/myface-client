import { useEffect, useState } from "react"

import FormInput from "../helpers/components/form/FormInput"
import FormTemplate from "../helpers/components/form/FormTemplate"
import { getUserErrors, hasErrors, hasFileError, hasUserFieldError } from "../../util/validation"
import { useOutletContext } from "react-router-dom"
import { ALLOWED_FILE_TYPES } from "../../constants"
import { useDispatch } from "react-redux"
import { edit } from "../../store/auth"

const Edit = () => {
    const [values, setValues] = useState({
        profilePic: '',
        fname: '',
        lname: '',
        dob: '',
        gender: '',
    })

    const [errors, setErrors] = useState(getUserErrors())

    const { user } = useOutletContext()

    useEffect(() => {
        if (user._id) {
            setValues({
                fname: user.fname,
                lname: user.lname,
                dob: user.dob,
                gender: user.gender
            })
        }
    }, [user])

    const dispatch = useDispatch()

    const onValueChange = ({ target: { name, value } }) => {
        setValues(state => ({ ...state, [name]: value }))
    }

    const onBlur = ({ target: { name, value } }) => {
        setErrors(state => ({
            ...state, [name]: {
                value: hasUserFieldError(name, value, values),
                hints: [...state[name].hints]
            }
        }))
    }

    const onImage = ({ target: { name, files } }) => {
        let value = files[0]

        setValues(state => ({ ...state, [name]: value }))

        setErrors(state => ({
            ...state, [name]: {
                value: hasFileError(value),
                hints: [...state[name].hints]
            }
        }))
    }

    const onSubmit = e => {
        e.preventDefault()

        if (!hasErrors(errors))
            dispatch(edit(values))
    }

    return (
        <FormTemplate title={'Edit Profile Info'} onSubmit={onSubmit} btnTxt={'Edit'}>
            <FormInput type={'file'} id={'profilePic'} name={'profilePic'} label={'Profile Picture'} error={errors.profilePic} onValueChange={onImage} />

            <FormInput type={'text'} id={'fname'} name={'fname'} label={'First Name'} error={errors.fname} value={values.fname} onValueChange={onValueChange} onBlur={onBlur} placeholder={'First Name'} />

            <FormInput type={'text'} id={'lname'} name={'lname'} label={'Last Name'} error={errors.lname} value={values.lname} onValueChange={onValueChange} onBlur={onBlur} placeholder={'Last Name'} />

            <fieldset>
                <legend>Gender</legend>

                <FormInput type={'radio'} name={'gender'} label={'Female'} value={'female'} onValueChange={onValueChange} onBlur={onBlur} checked={values.gender == 'female'} />

                <FormInput type={'radio'} name={'gender'} label={'Male'} value={'male'} onValueChange={onValueChange} onBlur={onBlur} checked={values.gender == 'male'} />
            </fieldset>

            <FormInput label={'Date of Birth'} type={'date'} id={'dob'} name={'dob'} value={values.dob} onValueChange={onValueChange} onBlur={onBlur} />
        </FormTemplate>
    )
}

export default Edit