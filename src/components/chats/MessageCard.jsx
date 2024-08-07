import { CDN_ADDRESS } from "../../constants"
import ProfilePic from "../helpers/components/images/ProfilePic"
import { getDateAndTime } from "../../util/helpers"

import style from './style.module.css'
import { useStatus } from "../helpers/customHooks/useStatus"

const MessageCard = ({ message, openImagesInCarousel }) => {

    const { data } = useStatus()

    return (
        <li className={message.user._id == data._id ? style.messageLiUser : style.messageLi}>
            {message.user._id != data._id &&
                <ProfilePic user={message.user} className={style.messageAvatar} />
            }

            <div>
                <span>{getDateAndTime(message.createdAt)}</span>
                <div className={style.messageImgsContainer}>
                    {message.images.map((id, ind) =>
                        <img
                            key={id}
                            style={{
                                maxWidth: message.images.length == 1 ? 180 : 90,
                                maxHeight: message.images.length == 1 ? 180 : 90
                            }}
                            className={style.messageImg}
                            src={`${CDN_ADDRESS}/${id}`}
                            onClick={openImagesInCarousel(message.images, ind)}
                        />
                    )}
                </div>

                <p>
                    {message.text}
                </p>
            </div>
        </li>
    )
}

export default MessageCard