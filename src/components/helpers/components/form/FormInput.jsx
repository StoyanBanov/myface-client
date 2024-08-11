import { ALLOWED_FILE_TYPES } from '../../../../constants'
import style from './style.module.css'

const FormInput = ({ id, name, label, type = 'text', error, value = '', onValueChange, onBlur, placeholder, required, checked, multiple }) => {
    return (
        <>
            <label className={style.inputLabel} htmlFor={id}>
                <span>{label}</span>

                {type != 'textarea'
                    ? <input
                        className={error?.value ? style.inputError : ''}
                        type={type}
                        id={id}
                        name={name}
                        value={type == 'file' ? undefined : value}
                        onChange={onValueChange}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        required={required}
                        checked={checked}
                        multiple={multiple}
                        accept={ALLOWED_FILE_TYPES.join(', ')}
                    />

                    : <textarea
                        id={id}
                        name={name}
                        value={value}
                        onChange={onValueChange}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        required={required}
                        rows={5}
                    />
                }
            </label>

            {error?.value && error.hints.length > 0 &&
                <ul className={style.errorsUl}>
                    {error.hints.map(h => <li key={h}>-{h}</li>)}
                </ul>
            }
        </>
    )
}

export default FormInput