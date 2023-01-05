import Post from "./Post"

export default function Posts() {
    const posts = [
        {
            id: "1",
            username: "muziranoon",
            userImg: "https://durnmoosemovies.files.wordpress.com/2015/04/ss4.jpg",
            img: "https://c8.alamy.com/comp/E5N4C3/a-soldiers-story-howard-e-rollins-jr-1984-columbia-picturescourtesy-E5N4C3.jpg",
            caption: "Way back :)"
        },
        {
            id: "2",
            username: "muziranoon",
            userImg: "https://durnmoosemovies.files.wordpress.com/2015/04/ss4.jpg",
            img: "https://c8.alamy.com/comp/E5N4C3/a-soldiers-story-howard-e-rollins-jr-1984-columbia-picturescourtesy-E5N4C3.jpg",
            caption: "cooooool"
        },
    ]

    return (
        <ul>
            {posts.map(({ id, username, userImg, img, caption, }) => <Post id={id} username={username} userImg={userImg} img={img} caption={caption} key={id} />)}
        </ul>
    )
}