import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addComment, clearComments, getComments } from "../../store/post/comments"
import FormTemplate from "../helpers/components/form/FormTemplate"
import FormInput from "../helpers/components/form/FormInput"
import { getCommentErrors, hasCommentFieldError, hasErrors } from "../../util/validation"

import style from './style.module.css'
import PostCommentCard from "./PostCommentCard"

const PostComments = ({ post }) => {
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const [values, setValues] = useState({
        text: '',
        images: []
    })

    const [errors, setErrors] = useState(getCommentErrors())

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getComments(post._id))

        return () => {
            dispatch(clearComments())
        }
    }, [dispatch, post])

    const { list, loading } = useSelector(state => state.entities.comments)

    const onValueChange = ({ target: { name, value } }) => {
        setValues(state => ({ ...state, [name]: value }))
    }

    const onBlur = ({ target: { name, value } }) => {
        setErrors(state => ({
            ...state, [name]: {
                value: hasCommentFieldError(name, value),
                hints: [...state[name].hints]
            }
        }))
    }

    const onImage = ({ target: { name, files } }) => {
        setValues(state => ({ ...state, [name]: [...files] }))

        setErrors(state => ({
            ...state, [name]: {
                value: hasCommentFieldError(name, files),
                hints: [...state[name].hints]
            }
        }))
    }

    const onSubmit = e => {
        e.preventDefault()

        if (!hasErrors(errors) && (values.text || values.images)) {
            dispatch(addComment({ ...values, post: post._id }))

            setHasSubmitted(true)
        }
    }

    return (
        <div>
            <div style={{ position: 'relative' }}>
                <FormTemplate btnTxt={'Add'} title={'Comment'} onSubmit={onSubmit}>
                    <FormInput id={'text'} name={'text'} label={'Text'} value={values.text} error={errors.text} onValueChange={onValueChange} onBlur={onBlur} />

                    <FormInput type={'file'} id={'images'} name={'images'} label={'Images'} error={errors.images} onValueChange={onImage} multiple={true} />
                </FormTemplate>

                {hasSubmitted && loading &&
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'black', opacity: '50%' }}>
                        <h3 style={{ color: 'white' }}>Loading...</h3>
                    </div>
                }
            </div>


            <ul>
                {list.map(c => <PostCommentCard key={c._id} post={post} comment={c} />)}

                {loading && !hasSubmitted &&
                    new Array(5).fill(0).map((_, i) =>
                        <li key={i} className={style.postCardContainer} style={{ height: '10vh' }}>
                        </li>
                    )
                }
            </ul>

            {
                list.length == 0 &&
                <p>No comments yet</p>
            }
        </div >
    )
}

export default PostComments