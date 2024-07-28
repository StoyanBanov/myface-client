import { Outlet } from "react-router-dom"

import InnerNav from "../helpers/components/innerNav/InnerNav"

const Search = () => {
    return (
        <>
            <InnerNav links={[
                { to: '/search/users', text: 'Users' },
                { to: '/search/posts', text: 'Posts' }
            ]} />

            <Outlet />
        </>
    )
}

export default Search