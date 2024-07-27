import style from './style.module.css'

const FormTemplate = ({ children, onSubmit, title, btnTxt }) => {
    return (
        <fieldset className={style.mainFieldset}>
            <legend><h2>{title}</h2></legend>

            <form className={style.mainForm} onSubmit={onSubmit} >
                {children}

                <button>{btnTxt}</button>
            </form>
        </fieldset>
    )
}

export default FormTemplate