import { useState } from "react"
import { addPost } from "../../store/post/posts"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const CreatePost = () => {
    const [values, setValues] = useState({
        text: ''
    })

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const onValueChange = ({ target: { name, value } }) => {
        setValues(state => ({ ...state, [name]: value }))
    }

    const onSubmit = e => {
        e.preventDefault()

        dispatch(addPost(values))

        navigate('/posts/:id')
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="text">
                <input id="text" name="text" value={values.text} onChange={onValueChange} />
            </label>

            <button>Post</button>
        </form>
    )
}

export default CreatePost