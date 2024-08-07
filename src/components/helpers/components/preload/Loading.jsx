import style from './style.module.css'

const Loading = ({ loading }) => {
    return (
        <>
            {loading &&
                <div className={style.preloadContainer}>
                    <h3 style={{ color: 'white' }}>Loading...</h3>
                </div>
            }
        </>
    )
}

export default Loading