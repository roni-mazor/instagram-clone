import { useSession, signIn, signOut } from 'next-auth/react'


interface Props {
    className?: string
}
export default function UserPreview({ className }: Props) {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                <img className={`${className} rounded-full h-10 w-10 hover:bg-gray-200 p-1 cursor-pointer`} onClick={() => signOut()} src={session?.user?.image!} alt="Sign out" />
            </>
        )
    }
    return (
        <>
            <button className={`${className} bg-blue-500 text-white font-medium rounded-md px-4 py-2 hover:brightness-105 hover:shadow-md whitespace-nowrap `} onClick={() => signIn()}>Sign in</button>
        </>
    )
}