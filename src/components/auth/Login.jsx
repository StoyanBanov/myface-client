import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../store/auth'
import { useSetAuthData } from '../helpers/customHooks/useSetAuthData'

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
        <form onSubmit={onSubmit} >
            <label htmlFor='email'>
                <input id='email' name='email' value={values.email} onChange={onValueChange} />
            </label>

            <label htmlFor='password'>
                <input id='password' name='password' value={values.password} onChange={onValueChange} />
            </label>

            <button>Login</button>

        </form>
    )
}

export default Login