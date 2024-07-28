import { useDispatch } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { clearUsers, getUsers } from "../../store/users"
import { useEffect } from "react"

import UsersList from "../helpers/components/users/UsersList"


const SearchUsers = () => {
    const dispatch = useDispatch()

    const [searchParams] = useSearchParams()

    useEffect(() => {
        dispatch(getUsers(searchParams.get('search')))

        return () => {
            dispatch(clearUsers())
        }
    }, [dispatch, searchParams])

    return (
        <UsersList />
    )
}

export default SearchUsers