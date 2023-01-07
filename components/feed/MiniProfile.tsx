import { signOut, useSession } from "next-auth/react"

export default function MiniProfile() {
    const { data: session } = useSession()
    return (
        <div className="flex items-center mt-[14px] ml-[10px] p-2 justify-between">
            {(session?.user) && <>
                <img src={session.user.image ?? ''} className="h-12 w-12 rounded-full object-cover border p-[2px]" alt="" />
                <div className="flex-1 ml-3">
                    <h2 className="font-bold">{session.user.name}</h2>
                    <h3 className="text-sm text-gray-400">Welcome to Instagrar</h3>
                </div>
                <button onClick={() => signOut()} className="font-semibold text-blue-400">Sign Out</button>
            </>}
        </div>
    )
}