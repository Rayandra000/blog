export default function LoadingComp() {
    return (
        <div className="flex w-screen h-screen justify-center items-center">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="https://www.blogger.com/img/logo_blogger_40px_2x.png" className="h-8" alt="Blog Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Blogger</span>
            </div>
        </div>
    )
}