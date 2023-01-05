import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";

export default function Feed() {


    return (
        <>
            <main className="mx-auto md:max-w-6xl grid grid-cols-1 md:grid-cols-3">
                <section className="md:col-span-2">
                    <Stories />
                    <Posts />
                </section>
                <section className="hidden md:inline--grid md:col-span-1 md:flex md:flex-col md:justify-start">
                    <MiniProfile />
                    {/* suggestions */}
                </section>
            </main>
        </>
    )
}