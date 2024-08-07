import { ALLOWED_FILE_TYPES, MAX_IMAGE_SIZE, MAX_IMAGES_COUNT, PASSWORD_REGEX } from "../constants"

export const hasErrors = (errors) => {
    return Object.values(errors).some(e => e.value)
}

export const hasFileError = (file) => file && (file.size > MAX_IMAGE_SIZE || !ALLOWED_FILE_TYPES.includes(file.type))

const getFileError = () => ({ value: false, hints: ['No larger than 4MB', `Supported formats: ${ALLOWED_FILE_TYPES.join(', ')}`] })
export const getFilesError = () => ({ value: false, hints: ['No larger than 4MB', `Supported formats: ${ALLOWED_FILE_TYPES.join(', ')}`, `No more than ${MAX_IMAGES_COUNT} files`] })

export const hasImagesError = (images) =>
    [...images].some(i => hasFileError(i))
    || images.length > MAX_IMAGES_COUNT

// User validation

export const hasUserFieldError = (name, value, values) => {
    switch (name) {
        case 'email':
            return value.length > 30
        case 'fname':
        case 'lname':
            return value.length < 2 || value.length > 30
        case 'dob':
            return (Date.now() - Date.parse(value)) / 31536000000 < 12
        case 'password':
            return !PASSWORD_REGEX.test(value)
        case 'rePassword':
            return value != values.password
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
            return value.length > 2000
        case 'images':
            return hasImagesError(value)
        default:
            return false
    }
}

export const getPostErrors = () => {
    return {
        images: getFilesError(),
        text: { value: false, hints: ['No longer than 2000 characters'] }
    }
}


// Comment validation

export const hasCommentFieldError = (name, value) => {
    switch (name) {
        case 'text':
            return value.length > 500
        case 'images':
            return hasImagesError(value)
        default:
            return false
    }
}

export const getCommentErrors = () => {
    return {
        images: getFilesError(),
        text: { value: false, hints: ['No longer than 500 characters'] }
    }
}