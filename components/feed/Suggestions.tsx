import minifaker from 'minifaker';
import { useEffect, useState } from 'react';
import 'minifaker/locales/en'

interface Suggestion {
    username: string,
    img: string,
    title: string,
    id: number
}

export default function Suggestions() {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])

    useEffect(() => {
        const suggestions = minifaker.array(5, (i) => ({
            username: minifaker.username(),
            img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
            title: minifaker.jobTitle(),
            id: i
        }))
        setSuggestions(suggestions)
    }, [])

    return (
        <div className="mt-4 ml-[10px]">
            <div className="p-3 flex justify-between mb-5 text-sm">
                <h3 className=" text-gray-400 font-bold">Suggestions for you</h3>
                <button className="text-gray-600 font-semibold">See all</button>
            </div>
            <ul className="w-full">
                {suggestions.map(({ img, username, id, title }) => (
                    <li key={id} className="w-full flex items-center mt-[3px] p-2 justify-between">
                        <img src={img} className="h-8 w-8 rounded-full object-cover ring-1 ring-gray-200 p-[2px]" alt="" />
                        <div className="flex-1 ml-3 truncate">
                            <h2 className="font-semibold text-sm ">{username}</h2>
                            <h3 className="text-sm text-gray-400 truncate">{title}</h3>
                        </div>
                        <button className="p-[3px] text-sm font-semibold text-blue-400">Follow</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}