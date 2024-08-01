import { useEffect, useState } from "react"
import { addPost } from "../../store/post/posts"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import FormInput from "../helpers/components/form/FormInput"
import FormTemplate from "../helpers/components/form/FormTemplate"
import { getPostErrors, hasErrors, hasPostFieldError } from "../../util/validation"

const CreatePost = () => {
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const [values, setValues] = useState({
        text: '',
        images: [],
        visibility: 'friends'
    })

    const [errors, setErrors] = useState(getPostErrors())

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { list, loading } = useSelector(state => state.entities.posts)

    useEffect(() => {
        if (hasSubmitted && !loading)
            navigate('/posts/' + list[0]._id)
    }, [dispatch, navigate, hasSubmitted, loading, list])

    const onValueChange = ({ target: { name, value } }) => {
        setValues(state => ({ ...state, [name]: value }))
    }

    const onBlur = ({ target: { name, value } }) => {
        setErrors(state => ({
            ...state, [name]: {
                value: hasPostFieldError(name, value),
                hints: [...state[name].hints]
            }
        }))
    }

    const onImage = ({ target: { name, files } }) => {
        setValues(state => ({ ...state, [name]: [...files] }))

        setErrors(state => ({
            ...state, [name]: {
                value: hasPostFieldError(name, files),
                hints: [...state[name].hints]
            }
        }))
    }

    const onSubmit = e => {
        e.preventDefault()

        if (!hasErrors(errors) && (values.text || values.images)) {
            dispatch(addPost(values))

            setHasSubmitted(true)
        }
    }

    return (
        <FormTemplate title={'Create Post'} btnTxt={'Post'} onSubmit={onSubmit}>
            <FormInput id={'text'} name={'text'} label={'Text'} value={values.text} error={errors.text} onValueChange={onValueChange} onBlur={onBlur} />

            <FormInput type={'file'} id={'images'} name={'images'} label={'Images'} multiple={true} value={values.text} error={errors.images} onValueChange={onImage} />

            <label htmlFor="visibility">
                <span>Visibility</span>

                <select id="visibility" name="visibility" value={values.visibility} onChange={onValueChange}>
                    <option value={'owner'}>Only me</option>
                    <option value={'friends'}>Friends</option>
                    <option value={'all'}>Everyone</option>
                </select>
            </label>
        </FormTemplate>
    )
}

export default CreatePost