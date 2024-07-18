import { useState } from "react"
import { useDispatch } from "react-redux"
import { register } from "../../store/auth"
import { useSetAuthData } from "../helpers/customHooks/useSetAuthData"
import { useNavigate } from "react-router-dom"

const Register = () => {
    const [values, setValues] = useState({
        email: '',
        fname: '',
        lname: '',
        password: '',
        rePassword: ''
    })

    useSetAuthData()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const onValueChange = ({ target: { name, value } }) => {
        setValues(state => ({ ...state, [name]: value }))
    }

    const onSubmit = e => {
        e.preventDefault()

        dispatch(register(values))

        navigate('/verify')
    }

    return (
        <form onSubmit={onSubmit} >
            <label htmlFor="email">
                Email
                <input id="email" name='email' value={values.email} onChange={onValueChange} placeholder="example@gmail.com" />
            </label>

            <label htmlFor="fname">
                <input id="fname" name='fname' value={values.fname} onChange={onValueChange} placeholder="First Name" />
            </label>

            <label htmlFor="lname">
                <input id="lname" name='lname' value={values.lname} onChange={onValueChange} placeholder="Last Name" />
            </label>

            <label htmlFor="password">
                <input id="password" name='password' value={values.password} onChange={onValueChange} />
            </label>

            <label htmlFor="rePassword">
                <input id="rePassword" name='rePassword' value={values.rePassword} onChange={onValueChange} />
            </label>

            <button>Register</button>
        </form>
    )
}

export default Register