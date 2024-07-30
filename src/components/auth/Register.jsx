import { useState } from "react"
import { useDispatch } from "react-redux"
import { register } from "../../store/auth"
import { Link } from "react-router-dom"

import FormInput from "../helpers/components/form/FormInput"

import FormTemplate from "../helpers/components/form/FormTemplate"
import { getUserErrors, hasErrors, hasUserFieldError } from "../../util/validation"

const Register = () => {
    const [values, setValues] = useState({
        email: '',
        fname: '',
        lname: '',
        password: '',
        rePassword: '',
        dob: ''
    })

    const [errors, setErrors] = useState(getUserErrors())

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

    const onSubmit = e => {
        e.preventDefault()

        if (!hasErrors(errors))
            dispatch(register(values))
    }

    return (
        <>
            <FormTemplate title={'Register'} onSubmit={onSubmit} btnTxt={'Register'}>

                <FormInput type={'email'} id={'email'} name={'email'} label={'Email'} error={errors.email} value={values.email} onValueChange={onValueChange} onBlur={onBlur} placeholder={'example@gmail.com'} required={true} />

                <FormInput type={'text'} id={'fname'} name={'fname'} label={'First Name'} error={errors.fname} value={values.fname} onValueChange={onValueChange} onBlur={onBlur} placeholder={'First Name'} required={true} />

                <FormInput type={'text'} id={'lname'} name={'lname'} label={'Last Name'} error={errors.lname} value={values.lname} onValueChange={onValueChange} onBlur={onBlur} placeholder={'Last Name'} required={true} />

                <fieldset>
                    <legend>Gender</legend>

                    <FormInput type={'radio'} name={'gender'} label={'Female'} value={'female'} onValueChange={onValueChange} onBlur={onBlur} />

                    <FormInput type={'radio'} name={'gender'} label={'Male'} value={'male'} onValueChange={onValueChange} onBlur={onBlur} />
                </fieldset>

                <FormInput type={'date'} id={'dob'} name={'dob'} label={'Date of Birth'} error={errors.dob} value={values.dob} onValueChange={onValueChange} onBlur={onBlur} />

                <FormInput type={'password'} id={'password'} name={'password'} label={'Password'} error={errors.password} value={values.password} onValueChange={onValueChange} onBlur={onBlur} required={true} />

                <FormInput type={'password'} id={'rePassword'} name={'rePassword'} label={'Repeat Password'} error={errors.rePassword} value={values.rePassword} onValueChange={onValueChange} onBlur={onBlur} required={true} />

            </FormTemplate>

            <span>Already have and account? <Link to={'/login'}>Login</Link></span>
        </>
    )
}

export default Register