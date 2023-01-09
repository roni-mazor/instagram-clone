import { DocumentData } from "firebase/firestore"
import Moment from "react-moment"


interface Props {
    comment: DocumentData

}

export default function PostComment({ comment }: Props) {

    return (
        <li className="flex space-x-1 text-sm px-4 py-1 text-gray-900 items-center">
            <img src={comment.userImage} className="h-8 w-8 rounded-full object-cover ring-1 ring-gray-200 p-[2px]" alt="user image" />
            <p className="font-semibold ">{comment.userName}</p>
            <p className="flex-1 break-all">{comment.comment}</p>
            <Moment fromNow className="font-medium text-gray-700" >{comment.timestamp?.toDate()}</Moment>
        </li>
    )
}