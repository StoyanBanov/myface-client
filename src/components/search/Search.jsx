import { Outlet, useSearchParams } from "react-router-dom"

import InnerNav from "../helpers/components/innerNav/InnerNav"

const Search = () => {
    const [searchParams] = useSearchParams()

    const search = searchParams.get('search')

    const linkQuery = `?search=${search}` || ''

    return (
        <>
            <InnerNav links={[
                { to: '/search/users' + linkQuery, text: 'Users' },
                { to: '/search/posts' + linkQuery, text: 'Posts' }
            ]} />

            <Outlet context={{ search }} />
        </>
    )
}

export default Search