import style from './style.module.css'

const NoMoreContent = ({ contentType }) => {
    return (
        <div className={style.noMoreContainer}>
            <span>No more {contentType} to show</span>
        </div>
    )
}

export default NoMoreContent