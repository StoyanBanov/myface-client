import { ALLOWED_FILE_TYPES, MAX_IMAGE_SIZE, PASSWORD_REGEX } from "../constants"

export const hasErrors = (errors) => {
    return Object.values(errors).some(e => e.value)
}

export const hasFileError = (file) => file && (file.size > MAX_IMAGE_SIZE || !ALLOWED_FILE_TYPES.includes(file.type))

const getFileError = () => ({ value: false, hints: ['No larger than 4MB', `Supported formats: ${ALLOWED_FILE_TYPES.join(', ')}`] })

// User validation

export const hasUserFieldError = (name, value, values) => {
    switch (name) {
        case 'email':
            if (value.length > 30)
                return true
            return false
        case 'fname':
        case 'lname':
            if (value.length < 2 || value.length > 30)
                return true
            return false
        case 'dob':
            if ((Date.now() - Date.parse(value)) / 31536000000 < 12) {
                return true
            }
            return false
        case 'password':
            if (!PASSWORD_REGEX.test(value))
                return true
            return false
        case 'rePassword':
            if (value != values.password)
                return true
            return false
        default:
            return false
    }
}

export const getUserErrors = () => {
    return {
        profilePic: getFileError(),
        email: { value: false, hints: ['No longer than 30 characters'] },
        fname: { value: false, hints: ['At least 2 characters long', 'No longer than 20 characters'] },
        lname: { value: false, hints: ['At least 2 characters long', 'No longer than 20 characters'] },
        password: { value: false, hints: ['At least 8 characters long', 'At least 1 number', 'At least 1 small letter', 'At least 1 capital letter', 'At least 1 special character'] },
        rePassword: { value: false, hints: [] },
        dob: { value: false, hints: ['At least 12 years old'] },
        gender: { value: false, hints: [] }
    }
}


// Post validation

export const hasPostFieldError = (name, value) => {
    switch (name) {
        case 'text':
            if (value.length > 2000)
                return true
            return false
        case 'images':
            if ([...value].some(i => hasFileError(i)))
                return true
            return false
        default:
            return false
    }
}

export const getPostErrors = () => {
    return {
        images: getFileError(),
        text: { value: false, hints: ['No longer than 2000 characters'] }
    }
}


// Comment validation

export const hasCommentFieldError = (name, value) => {
    switch (name) {
        case 'text':
            if (value.length > 500)
                return true
            return false
        case 'images':
            if ([...value].some(i => hasFileError(i)))
                return true
            return false
        default:
            return false
    }
}

export const getCommentErrors = () => {
    return {
        images: getFileError(),
        text: { value: false, hints: ['No longer than 500 characters'] }
    }
}