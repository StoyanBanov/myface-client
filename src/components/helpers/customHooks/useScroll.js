import { useCallback, useEffect } from "react"
import { useDispatch } from "react-redux"

export const useScroll = (loading, hasReceivedAll, getActionCreator, element) => {
    const dispatch = useDispatch()

    const onScroll = useCallback(() => {
        const scrollable = element || document.querySelector('html')

        if (!loading && !hasReceivedAll && scrollable.scrollTop == scrollable.scrollHeight - scrollable.clientHeight) {
            dispatch(getActionCreator())
            scrollable.scrollTop = scrollable.scrollTop - 2
        }
    }, [element, loading, hasReceivedAll, dispatch, getActionCreator])

    useEffect(() => {
        const scrollable = element || document

        scrollable.addEventListener('scroll', onScroll)

        return () => {
            scrollable.removeEventListener('scroll', onScroll)
        }
    }, [element, onScroll])
}