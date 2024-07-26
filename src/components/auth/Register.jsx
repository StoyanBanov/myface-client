import { useState } from "react"
import { useDispatch } from "react-redux"
import { register } from "../../store/auth"
import { Link } from "react-router-dom"

import FormInput from "../helpers/components/formInput/FormInput"

import style from './style.module.css'
import { PASSWORD_REGEX } from "../../constants"

const Register = () => {
    const [values, setValues] = useState({
        email: '',
        fname: '',
        lname: '',
        password: '',
        rePassword: '',
        dob: undefined
    })

    const [errors, setErrors] = useState({
        email: { value: false, hints: [] },
        fname: { value: false, hints: ['At least 2 characters long'] },
        lname: { value: false, hints: ['At least 2 characters long'] },
        password: { value: false, hints: ['At least 8 characters long', 'At least 1 number', 'At least 1 small letter', 'At least 1 capital letter', 'At least 1 special character'] },
        rePassword: { value: false, hints: [] },
        dob: { value: false, hints: ['At least 12 years old'] },
        gender: { value: false, hints: [] }
    })

    const dispatch = useDispatch()

    const onValueChange = ({ target: { name, value } }) => {
        setValues(state => ({ ...state, [name]: value }))

        let hasError = false
        switch (name) {
            case 'fname':
            case 'lname':
                if (value.length < 2)
                    hasError = true
                break;
            case 'dob':
                if ((Date.parse(value) - Date.now()) / 31536000000 < 12)
                    hasError = true
                break
            case 'password':
                if (!PASSWORD_REGEX.test(value))
                    hasError = true
                break
            case 'rePassword':
                if (value != values.password)
                    hasError = true
                break
            default:
                break;
        }

        setErrors(state => ({ ...state, [name]: { value: hasError, hints: [...state[name].hints] } }))
    }

    const onSubmit = e => {
        e.preventDefault()

        dispatch(register(values))
    }

    return (
        <fieldset className={style.authFieldset}>
            <legend><h2>Register</h2></legend>

            <form className={style.authForm} onSubmit={onSubmit}>
                <FormInput type={'email'} id={'email'} name={'email'} label={'Email'} error={errors.email} value={values.email} onValueChange={onValueChange} placeholder={'example@gmail.com'} required={true} />

                <FormInput type={'text'} id={'fname'} name={'fname'} label={'First Name'} error={errors.fname} value={values.fname} onValueChange={onValueChange} placeholder={'First Name'} required={true} />

                <FormInput type={'text'} id={'lname'} name={'lname'} label={'Last Name'} error={errors.lname} value={values.lname} onValueChange={onValueChange} placeholder={'Last Name'} required={true} />

                <fieldset>
                    <legend>Gender</legend>

                    <FormInput type={'radio'} name={'gender'} label={'Female'} value={'female'} onValueChange={onValueChange} />

                    <FormInput type={'radio'} name={'gender'} label={'Male'} value={'male'} onValueChange={onValueChange} />
                </fieldset>

                <FormInput type={'date'} id={'dob'} name={'dob'} label={'Date of Birth'} error={errors.dob} value={values.dob} onValueChange={onValueChange} />

                <FormInput type={'password'} id={'password'} name={'password'} label={'Password'} error={errors.password} value={values.password} onValueChange={onValueChange} required={true} />

                <FormInput type={'password'} id={'rePassword'} name={'rePassword'} label={'Repeat Password'} error={errors.rePassword} value={values.rePassword} onValueChange={onValueChange} required={true} />

                <button>Register</button>
            </form>

            <span>Already have and account? <Link to={'/login'}>Login</Link></span>
        </fieldset>
    )
}

export default Register