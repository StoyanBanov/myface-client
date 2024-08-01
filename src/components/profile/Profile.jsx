import { Outlet } from "react-router-dom"

import ProfilePic from "../helpers/components/images/ProfilePic"

import InnerNav from "../helpers/components/innerNav/InnerNav"
import { useStatus } from "../helpers/customHooks/useStatus"

const Profile = ({ user }) => {
    const { data } = useStatus()

    return (
        <>
            {user &&
                <>
                    <ProfilePic user={user} />

                    {data._id == user._id &&
                        <InnerNav links={[
                            { to: '/profile/overview', text: 'Overview' },
                            { to: '/profile/friends', text: 'Friends' },
                            { to: '/profile/requests', text: 'Requests' },
                            { to: '/profile/posts', text: 'Posts' },
                            { to: '/profile/edit', text: 'Edit' },
                            { to: '/profile/settings', text: 'Settings' }
                        ]} />
                    }

                    <Outlet context={{ user }} />
                </>
            }
        </>
    )
}

export default Profile