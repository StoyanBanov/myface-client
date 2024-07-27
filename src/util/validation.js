import { PASSWORD_REGEX } from "../constants"

export const validateUserField = (name, value, values) => {
    switch (name) {
        case 'fname':
        case 'lname':
            if (value.length < 2)
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