import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../../atom/modalAtom";
import UserPreview from "./UserPreview";

export default function HeaderUserActivities() {
    const [isOpen, setIsOpen] = useRecoilState(modalState)
    const { data: session } = useSession()
    const router = useRouter()

    return (
        <div className="flex space-x-2 items-center">
            {session && <>
                <p onClick={() => { setIsOpen((prevState) => !prevState) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:scale-110 relative top-[1px]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </p>
            </>}
            <UserPreview />
        </div>
    )
}