import { useSession } from "next-auth/react";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

export default function Feed() {
    const { data: session } = useSession()

    return (
        <>
            <main className={` ${session ? " md:max-w-6xl grid grid-cols-1 md:grid-cols-3" : " md:max-w-3xl grid grid-cols-1 "} mx-auto`}>
                <section className="md:col-span-2">
                    <Stories />
                    <Posts />
                </section>
                {session && <section className="hidden md:inline--grid md:col-span-1 md:flex md:flex-col md:justify-start">
                    <MiniProfile />
                    <Suggestions />
                </section>}
            </main>
        </>
    )
}