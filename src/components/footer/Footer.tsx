import { useContext, type ReactNode } from "react"
import { AuthContext } from "../../contexts/AuthContext"

import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react"

function Footer() {
  const data = new Date().getFullYear()

  const { usuario } = useContext(AuthContext)

  let component: ReactNode = null

  if (usuario.token !== "") {
    component = (
      <footer className="flex justify-center bg-gradient-to-r from-pink-400 to-purple-400 text-white py-10 mt-20">
        <div className="container flex flex-col items-center py-4 gap-2">
          <p className="text-xl font-bold text-center">
            Blog Pessoal Generation | Copyright: {data}
          </p>

          <p className="text-lg">Acesse minhas redes sociais</p>

          <div className="flex gap-4 mt-2">
            <a
              href="https://www.linkedin.com/in/pameladosreis/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition"
            >
              <LinkedinLogoIcon size={42} weight="bold" />
            </a>

            <a
              href="https://www.instagram.com/pamm.desi"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition"
            >
              <InstagramLogoIcon size={42} weight="bold" />
            </a>

            <a
              href="https://github.com/pammyu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition"
            >
              <FacebookLogoIcon size={42} weight="bold" />
            </a>
          </div>
        </div>
      </footer>
    )
  }

  return <>{component}</>
}

export default Footer
