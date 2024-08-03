import { useCallback, useEffect } from "react"
import { useDispatch } from "react-redux"

export const useScroll = (loading, hasReceivedAll, getActionCreator) => {
    const dispatch = useDispatch()

    const onScroll = useCallback(() => {
        const html = document.querySelector('html')

        if (!loading && !hasReceivedAll && html.scrollTop == html.scrollHeight - html.clientHeight) {
            dispatch(getActionCreator())
            html.scrollTop = html.scrollTop - 2
        }
    }, [loading, hasReceivedAll, dispatch, getActionCreator])

    useEffect(() => {
        document.addEventListener('scroll', onScroll)

        return () => {
            document.removeEventListener('scroll', onScroll)
        }
    }, [onScroll])
}