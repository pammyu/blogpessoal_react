import { FacebookLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"

function Footer() {

    const data = new Date().getFullYear()

    return (
        <>
            <div className='flex justify-center bg-gradient-to-r from-pink-400 to-purple-400 text-white py-10 mt-20'>
                <div className='container flex flex-col items-center py-4'>
                    <p className="text-x1 font-bold text-center">
                        Blog Pessoal Generation | Copyright: {data}
                    </p>
                <p className="text-lg">Acesse minhas redes sociais</p>
                <div className="flex gap-2.5">
                    <LinkedinLogoIcon size={48} weight="bold"/>
                    <InstagramLogoIcon size={48} weight="bold"/>
                    <FacebookLogoIcon size={48} weight="bold"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer