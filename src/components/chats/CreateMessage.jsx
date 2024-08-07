import { useState } from "react"
import { getFilesError, hasErrors, hasImagesError } from "../../util/validation"
import { addMessage } from "../../store/chat/messages"
import { useDispatch } from "react-redux"
import FormInput from "../helpers/components/form/FormInput"
import Loading from "../helpers/components/preload/Loading"

const CreateMessage = ({ chatId, loading }) => {
    const initialValues = {
        text: '',
        images: []
    }

    const [hasSubmitted, setHasSubmitted] = useState(false)

    const [values, setValues] = useState({ ...initialValues })

    const [errors, setErrors] = useState({ images: getFilesError() })

    const dispatch = useDispatch()

    const onValueChange = ({ target: { name, value } }) => {
        setValues(state => ({ ...state, [name]: value }))
    }

    const onFileChange = ({ target: { name, files } }) => {
        setValues(state => ({ ...state, [name]: [...files] }))

        setErrors(state => ({ ...state, name: hasImagesError(files) }))
    }

    const onMessageSubmit = e => {
        e.preventDefault()

        if (!hasErrors(errors) && (values.text || values.images.length)) {
            dispatch(addMessage({ ...values, chat: chatId }))

            setValues({ ...initialValues })

            setHasSubmitted(true)
        }
    }

    return (
        <div style={{ position: 'relative' }}>
            <form onSubmit={onMessageSubmit}>
                <input name="text" placeholder="text..." value={values.text} onChange={onValueChange} maxLength={500} />
                <FormInput type={'file'} name={'images'} multiple={true} onValueChange={onFileChange} />
            </form>

            <Loading loading={hasSubmitted && loading} />
        </div>
    )
}

export default CreateMessage