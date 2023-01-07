import { useSession, signIn, signOut, getProviders, ClientSafeProvider } from 'next-auth/react'
import { useRouter } from "next/router";
import { useContext } from 'react';
import { providersContext } from '../../pages';
import { FcGoogle } from 'react-icons/fc'


export default function UserPreview() {
    const { data: session } = useSession()
    const router = useRouter()
    const provider = useContext(providersContext)

    if (!provider) return <></>

    return session ?
        (
            <>
                <img className={` rounded-full h-10 w-10 hover:bg-gray-200 p-1 cursor-pointer`} onClick={() => signOut()} src={session?.user?.image!} alt="Sign out" />
            </>
        ) :
        (
            <>

                <button className="bg-slate-100 text-gray-400 font-medium rounded-lg px-2 py-2 hover:brightness-80 ring-1 hover:shadow-md flex items-center space-x-2"
                    onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
                    <span>
                        Sign in
                    </span>
                    <span className="relative top-[2px]">
                        <FcGoogle />
                    </span>
                </button>
            </>
        )


}



