import Image from "next/image";
import { FormEvent } from "react";
import HeaderUserActivities from "./HeaderUserActivities";



export default function AppHeader() {
    const search = (e: FormEvent) => {
        e.preventDefault()
    }
   

    return (
        <header className="bg-white sticky top-0  shadow-sm border-b-[1px] z-30">
            <div className="flex px-3 py-4 justify-between items-center m-auto max-w-6xl">

                <Image style={{ objectFit: 'cover' }} className="hidden sm:block" alt="instagram logo" width="120" height="40"
                    src="https://images.squarespace-cdn.com/content/v1/51648a31e4b0ce43232f830a/1524765150768-KHJD7DRJ85PM163163P2/instagram+logo.png" />
                <Image style={{ objectFit: 'cover' }} className="sm:hidden" alt="instagram logo" width="28" height="28"
                    src="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-instagram-icon-png-image_6315974.png" />
                <form onSubmit={search} className="relative bg-slate-50  hover:bg-slate-100 pl-6 pr-2 py-1 ring-1 ring-gray-400 rounded text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute w-4 h-4 text-gray-500 top-2 left-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <input className="w-full bg-transparent   outline-none text-sm" placeholder="Search" type="text" />
                    <button hidden type="submit"></button>
                </form>
                <HeaderUserActivities />
            </div>
        </header>
    )
}