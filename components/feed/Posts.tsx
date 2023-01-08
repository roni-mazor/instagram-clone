import { collection, DocumentData, onSnapshot, orderBy, query, QueryDocumentSnapshot } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { db } from "../../firebase"
import Post from "./Post"


// interface InstaPost {
//     id: string,
//     username: string,
//     userImg: string,
//     img: string,
//     caption: string,
//     timestamp: Date
// }

export default function Posts() {
    const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([])

    const { data: session } = useSession()

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(
                collection(db, 'posts'),
                orderBy('timestamp', 'desc')),
            (snapshot) => {
                setPosts(snapshot.docs)
            }
        )
        return unsubscribe
    }, [db])
    console.log(posts)
    return (
        <ul>
            {posts.map((post) => <Post
                session={session}
                key={post.id}
                id={post.id}
                username={post.data().username}
                userImg={post.data().userImg}
                img={post.data().image}
                caption={post.data().caption} />)}
        </ul>
    )
}