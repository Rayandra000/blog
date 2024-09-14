import Link from "next/link"
import Wrapper from "./wrapper"

export const Navbar = () => {
    return (
        <div className="sticky top-0 h-[80px]">
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <Wrapper>
                    <Link href={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://www.blogger.com/img/logo_blogger_40px_2x.png" className="h-8" alt="Blog Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Blogger</span>
                    </Link>
                </Wrapper>
            </nav>
        </div>
    )
}