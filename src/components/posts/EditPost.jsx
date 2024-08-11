import { useEffect, useState } from "react"
import { getPostErrors, hasErrors, hasPostFieldError } from "../../util/validation"
import { useSingleItemFromStore } from "../helpers/customHooks/useSingleItemFromStore"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { editPostById, getPostsById } from "../../store/post/posts"
import FormTemplate from "../helpers/components/form/FormTemplate"
import FormInput from "../helpers/components/form/FormInput"
import { CDN_ADDRESS } from "../../constants"
import Loading from "../helpers/components/preload/Loading"

import style from './style.module.css'
import CloseBtn from "../helpers/components/buttons/CloseBtn"

const EditPost = () => {
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const post = useSingleItemFromStore(getPostsById, null, 'posts')

    const [values, setValues] = useState({
        text: '',
        images: [],
        visibility: 'friends',
        removedImages: []
    })

    const [errors, setErrors] = useState(getPostErrors())

    useEffect(() => {
        if (post)
            setValues({
                text: post.text,
                images: [...post.images],
                visibility: post.visibility,
                removedImages: []
            })
    }, [post])


    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { loading } = useSelector(state => state.entities.posts)

    useEffect(() => {
        if (hasSubmitted && !loading)
            navigate('/posts/' + post._id)
    }, [dispatch, navigate, hasSubmitted, loading, post])


    const onSubmit = e => {
        e.preventDefault()

        if (!hasErrors(errors) && (values.text || values.images.length)) {
            dispatch(editPostById(post._id, values))

            setHasSubmitted(true)
        }
    }

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

    const onImage = ({ target: { files } }) => {
        setValues(state => ({ ...state, removedImages: [...post.images], images: [...files], }))

        setErrors(state => ({
            ...state, images: {
                value: hasPostFieldError('images', files),
                hints: [...state.images.hints]
            }
        }))
    }

    const onRemoveImage = (img) => () => {
        setValues(state => {
            const ind = state.images.indexOf(img)

            return {
                ...state,
                images: state.images.slice(0, ind).concat(state.images.slice(ind + 1)),
                removedImages: [...state.removedImages, img]
            }
        })
    }

    return (
        <>
            <Loading loading={hasSubmitted && loading} />

            <FormTemplate title={'Edit Post'} btnTxt={'Edit'} onSubmit={onSubmit}>
                {values.images.length > 0 &&
                    <ul className={style.postImgUl}>
                        {post.images.filter(i => values.images.includes(i)).map(i => <li key={i}>
                            <div className={style.editImagesContainer} >
                                <CloseBtn onClick={onRemoveImage(i)} />

                                <img
                                    style={{ maxWidth: '20vh', maxHeight: '20vh' }}
                                    className={style.postImg}
                                    src={`${CDN_ADDRESS}/${i}`}
                                    alt={i}
                                />
                            </div>
                        </li>)}
                    </ul>
                }

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

        </>
    )
}

export default EditPost