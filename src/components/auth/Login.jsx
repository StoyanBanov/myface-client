import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../store/auth'
import { Link } from 'react-router-dom'

import style from './style.module.css'
import FormInput from '../helpers/components/form/FormInput'
import FormTemplate from '../helpers/components/form/FormTemplate'

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const dispatch = useDispatch()

    const onValueChange = ({ target: { name, value } }) => {
        setValues(state => ({ ...state, [name]: value }))
    }

    const onSubmit = e => {
        e.preventDefault()

        dispatch(login(values))
    }

    return (
        <>
            <FormTemplate title={'Login'} onSubmit={onSubmit} btnTxt={'Login'}>
                <FormInput type={'text'} id={'email'} name={'email'} label={'Email'} value={values.email} onValueChange={onValueChange} placeholder={'example@gmail.com'} required={true} />

                <FormInput type={'text'} id={'password'} name={'password'} label={'Password'} value={values.password} onValueChange={onValueChange} required={true} />
            </FormTemplate>

            <span>Don't have an account? <Link to={'/register'}>Register</Link></span>
        </>
    )
}

export default Login