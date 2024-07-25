import style from './style.module.css'

const FormInput = ({ id, name, label, type, error, value, onValueChange, placeholder, required }) => {
    return (
        <>
            <label htmlFor={id}>
                <span>{label}</span>

                <input
                    className={error?.value ? style.inputError : ''}
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onValueChange}
                    placeholder={placeholder}
                    required={required}
                />
            </label>
            {error?.value && error.hints.length > 0 &&
                <ul>
                    {error.hints.map(h => <li key={h}>{h}</li>)}
                </ul>
            }
        </>
    )
}

export default FormInput