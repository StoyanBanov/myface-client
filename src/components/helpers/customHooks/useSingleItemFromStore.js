import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

export const useSingleItemFromStore = (getItemById, clearItems, entity) => {
    const [item, setItem] = useState(null)

    const { id } = useParams()

    const dispatch = useDispatch()

    const { list, loading, lastDeletedId } = useSelector(state => state.entities[entity])

    useEffect(() => {
        if (!loading && lastDeletedId != id) {
            if (list.length)
                setItem(list.find(p => p._id == id))
            else
                dispatch(getItemById(id))
        }
    }, [dispatch, loading, list, lastDeletedId, id, entity, getItemById])

    useEffect(() => {
        return () => {
            if (clearItems)
                dispatch(clearItems())
        }
    }, [dispatch, id, clearItems])

    return item
}