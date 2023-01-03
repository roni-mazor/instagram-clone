import Image from "next/image";
import HeaderUserActivities from "./HeaderUserActivities";



export default function AppHeader() {
 const a = 'a'

    return (
        <header className="flex px-3 py-1 justify-between items-center">
            <Image style={{ objectFit: 'cover' }} alt="instagram logo" width="120" height="40"
                src="https://images.squarespace-cdn.com/content/v1/51648a31e4b0ce43232f830a/1524765150768-KHJD7DRJ85PM163163P2/instagram+logo.png" />
            <input type="text" />
            <HeaderUserActivities/>
        </header>
    )
}