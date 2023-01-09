import { addDoc, collection, deleteDoc, doc, DocumentData, onSnapshot, orderBy, query, QueryDocumentSnapshot, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"
import { Session } from "next-auth"
import { FormEvent, useState, useEffect, useMemo, useRef } from "react"
import { db } from "../../firebase"
import PostComment from "./PostComment"

interface Props {
    id: string,
    username: string,
    userImg: string,
    img: string,
    caption: string,
    session: Session | null
}



export default function Post({ id, username, userImg, img, caption, session }: Props) {

    const [postComments, setPostComments] = useState<QueryDocumentSnapshot<DocumentData>[]>([])
    const [likes, setLikes] = useState<DocumentData[]>([])
    const hasLiked = useMemo(() => !!likes.find(like => like.id === session?.user.uid), [likes])
    const commentInput = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, 'posts', id, 'likes')),
            (snapshot) => {
                setLikes(snapshot.docs)
            }
        )
        return unsubscribe
    }, [db])

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, 'posts', id, 'comments'),
                orderBy('timestamp', 'desc')),
            (snapshot) => {
                setPostComments(snapshot.docs)
            }
        )
        return unsubscribe
    }, [db])

    const likePost = async () => {
        if (session?.user.uid && session.user.name) {
            const docInfo = doc(db, 'posts', id, 'likes', session.user.uid)
            if (hasLiked) {
                await deleteDoc(docInfo)
            } else {
                await setDoc(docInfo, {
                    username: session.user.name
                })

            }
        }
    }


    const focusCommentInput = () => {
        if (commentInput.current) commentInput.current.focus()
    }

    const [comment, setComment] = useState('')
    const sendComment = async (e: FormEvent) => {
        e.preventDefault()
        await addDoc(collection(db, 'posts', id, 'comments'), {
            comment,
            userName: session?.user.name,
            userImage: session?.user.image,
            timestamp: serverTimestamp(),

        })

        setComment('')
    }
    return (
        <li className="bg-white my-7 border rounded-md">

            {/* Mini user and options */}
            <div className="flex items-center p-3">
                <img src={userImg} alt={username} className="h-12 w-12 rounded-full object-cover ring-1 ring-gray-200 p-1 mr-3" />
                <p className="font-bold flex-1">{username}</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                </svg>
            </div>

            {/* Posts Image */}
            <img src={img} alt="failed to load image" className="object-cover w-full" />


            {/* Button set */}
            <div className="flex justify-between px-3 pt-3 items-center">
                <div className="flex space-x-3 items-center">
                    <p className="text-lg text-gray-700 font-semibold">{likes.length}</p>
                    {!hasLiked ?
                        <svg onClick={likePost} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-6 h-6 heart post-btn">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        :
                        <svg onClick={likePost} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" w-6 h-6 heart post-btn text-red-400">
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                    }
                    <svg onClick={focusCommentInput} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 chat-icon post-btn">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 bookmark post-btn">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                </svg>
            </div>

            {/* Caption */}
            <div className="flex space-x-2 px-3 mt-3 mb-6">
                <p className="font-bold" >{username}</p>
                <p className="truncate">{caption}</p>
            </div>


            {/* Comment Display section */}
            <ul>
                {postComments.map((pc) => <PostComment key={pc.id} comment={pc.data()} />)}
            </ul>


            {/* Comment Submit section */}
            {session && <form className="flex items-center p-3 space-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 post-btn">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                </svg>
                <input ref={commentInput} value={comment} onChange={(e) => setComment(e.target.value)} type="text" className="flex-1 border-none outline-none " placeholder="Enter your Comment" />
                <button onClick={sendComment} disabled={!comment.trim()} className="text-blue-400 disabled:text-blue-200">Post</button>
            </form>}


        </li>
    )
}