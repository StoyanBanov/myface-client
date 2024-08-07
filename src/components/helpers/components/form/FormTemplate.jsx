import Loading from '../preload/Loading'
import style from './style.module.css'

const FormTemplate = ({ children, onSubmit, title, btnTxt, preload = false }) => {
    return (
        <>
            <fieldset className={style.mainFieldset}>
                <legend><h2>{title}</h2></legend>

                <form className={style.mainForm} onSubmit={onSubmit} >
                    {children}

                    <button>{btnTxt}</button>
                </form>

                <Loading loading={preload} />
            </fieldset>
        </>
    )
}

export default FormTemplate