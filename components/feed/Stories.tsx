import minifaker from 'minifaker';
import { useEffect, useState } from 'react';
import 'minifaker/locales/fr'

interface StoryUser {
    img: string,
    username: string,
    id: number
}


export default function Stories() {
    const [storyUsers, setStoryUsers] = useState<StoryUser[]>([])

    useEffect(() => {
        const storyUsers = minifaker.array(20, (i) => ({
            username: minifaker.username(),
            img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
            id: i
        }))
        setStoryUsers(storyUsers)
    }, [])

    return (
        <>
            <div className="flex space-x-1 p-2 b-white mt-8 border-gray-200 border-[1px] overflow-x-scroll rounded-sm scrollbar-none bg-white">
                {storyUsers.map(({ img, username, id }) => (<article className="w-[40px] cursor-pointer" key={id}>
                    <img className=" p-[1px] rounded-full border-2 border-red-500 hover:scale-110" src={img} alt="" />
                    <p className="text-[10px] font-medium truncate">{username}</p>
                </article>))}
            </div>
        </>
    )
}