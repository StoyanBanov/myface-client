import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../store/auth'
import { useSetAuthData } from '../helpers/customHooks/useSetAuthData'
import { Link } from 'react-router-dom'

import style from './style.module.css'
import FormInput from '../helpers/components/formInput/FormInput'

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    useSetAuthData()

    const dispatch = useDispatch()

    const onValueChange = ({ target: { name, value } }) => {
        setValues(state => ({ ...state, [name]: value }))
    }

    const onSubmit = e => {
        e.preventDefault()

        dispatch(login(values))
    }

    return (
        <fieldset className={style.authFieldset}>
            <legend><h2>Login</h2></legend>

            <form className={style.authForm} onSubmit={onSubmit} >
                <FormInput type={'text'} id={'email'} name={'email'} label={'Email'} value={values.email} onValueChange={onValueChange} placeholder={'example@gmail.com'} required={true} />

                <FormInput type={'password'} id={'password'} name={'password'} label={'Password'} value={values.password} onValueChange={onValueChange} placeholder={'example@gmail.com'} required={true} />

                <button>Login</button>
            </form>

            <span>Don't have an account? <Link>Login</Link></span>
        </fieldset>
    )
}

export default Login