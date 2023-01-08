import { useRecoilState } from "recoil"
import { modalState } from "../atom/modalAtom"
import Modal from "react-modal"
import { AiFillCamera, AiFillCloseCircle } from "react-icons/ai"
import { ChangeEvent, useState, FormEvent } from "react";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore"
import { db, storage } from "../firebase";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 100
    },
};


export default function UploadModal() {
    const [isOpen, setIsOpen] = useRecoilState(modalState)
    const [uploadedImg, setUploadedImg] = useState<string | undefined>()
    const [caption, setCaption] = useState('')
    const { data: session } = useSession()


    const closeModal = () => {
        setIsOpen(false)
        setUploadedImg(undefined)
        setCaption('')
    }


    function onImgUpload(e: ChangeEvent<HTMLInputElement>) {
        const reader = new FileReader()
        if (e.target?.files?.length) {
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (e) => {
            if (e.target?.result && typeof e.target.result === 'string') setUploadedImg(e.target.result)
        }
    }

    const uploadPost = async (e: FormEvent) => {
        e.preventDefault()
        const docRef = await addDoc(collection(db, 'posts'), {
            caption,
            username: session?.user.name,
            userImg: session?.user.image,
            timestamp: serverTimestamp()
        })

        if (uploadedImg) {
            const imageRef = ref(storage, `posts/${docRef.id}/image`)
            await uploadString(imageRef, uploadedImg, "data_url")
            const downloadUrl = await getDownloadURL(imageRef)
            await updateDoc(doc(db, 'posts', docRef.id), {
                image: downloadUrl
            })
            // await uploadString(imageRef, uploadedImg, "data_url").then(
            //     async (snapshot) => {
            //         const downloadUrl = await getDownloadURL(imageRef)
            //         await updateDoc(doc(db, 'posts', docRef.id), {
            //             image: downloadUrl
            //         })
            //     }
            // )
            closeModal()
        }


    }

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onAfterOpen={() => { }}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Upload Modal"
            >

                <form className="flex flex-col items-center w-80 space-y-3 relative">
                    <button className="absolute top-[-15px] right-[-15px] text-gray-400 text-xl hover:brightness-90" onClick={closeModal}><AiFillCloseCircle /></button>
                    {!!uploadedImg ? <img className="w-full mx-h-[250px] object-cover cursor-pointer" title="Remove image" src={uploadedImg} onClick={() => setUploadedImg(undefined)} /> : <label className="rounded-full bg-red-100 p-2 hover:brightness-95">
                        <AiFillCamera className="text-red-400 text-2xl" />
                        <input onChange={onImgUpload} type="file" hidden />
                    </label>}
                    <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Write your caption" className=" text-center focus:outline-none w-ful" />
                    <button disabled={!caption || !uploadedImg} onClick={uploadPost}
                        className="w-full bg-gray-200 text-gray-400 p-2 font-semibold rounded-md hover:brightness-95 disabled:opacity-80 disabled:cursor-not-allowed">Upload Post</button>
                </form>
            </Modal>
        </div>
    )
}