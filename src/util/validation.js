import { PASSWORD_REGEX } from "../constants"

export const hasErrors = (errors) => {
    return Object.values(errors).some(e => e.value)
}

export const validateUserField = (name, value, values) => {
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
        email: { value: false, hints: ['No longer than 30 characters'] },
        fname: { value: false, hints: ['At least 2 characters long', 'No longer than 20 characters'] },
        lname: { value: false, hints: ['At least 2 characters long', 'No longer than 20 characters'] },
        password: { value: false, hints: ['At least 8 characters long', 'At least 1 number', 'At least 1 small letter', 'At least 1 capital letter', 'At least 1 special character'] },
        rePassword: { value: false, hints: [] },
        dob: { value: false, hints: ['At least 12 years old'] },
        gender: { value: false, hints: [] }
    }
}