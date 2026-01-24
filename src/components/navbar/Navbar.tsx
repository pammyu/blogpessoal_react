import { useContext, type ReactNode } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"

import {
  Sparkle,
  Newspaper,
  Tag,
  FolderPlus,
  UserCircle,
  SignOut,
} from "@phosphor-icons/react"
import { ToastAlerta } from "../../utils/ToastAlerta"

function Navbar() {
  const navigate = useNavigate()
  const { usuario, handleLogout } = useContext(AuthContext)

  function sair() {
    handleLogout()
    ToastAlerta('O Usuário foi desconectado com sucesso!', 'info')
    navigate("/")
  }

  const linkBase =
    "flex items-center gap-2 px-3 py-2 rounded-lg transition hover:bg-white/15 hover:text-pink-100"

  let component: ReactNode = null

  if (usuario.token !== "") {
    component = (
      <header className="w-full flex justify-center py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white">
        <div className="container flex justify-between items-center text-lg mx-8">
          <Link to="/home" className="flex items-center gap-2 text-2xl font-bold">
            <Sparkle size={26} weight="fill" />
            Blog Pink Code
          </Link>

          <nav className="flex gap-2">
            <Link to="/postagens" className={linkBase}>
              <Newspaper size={20} weight="fill" />
              Postagens
            </Link>

            <Link to="/temas" className={linkBase}>
              <Tag size={20} weight="fill" />
              Temas
            </Link>

            <Link to="/cadastrartema" className={linkBase}>
              <FolderPlus size={20} weight="fill" />
              Cadastrar Tema
            </Link>

            <Link to="/perfil" className={linkBase}>
              <UserCircle size={20} weight="fill" />
              Perfil
            </Link>

            <button
              type="button"
              onClick={sair}
              className={linkBase + " bg-white/10"}
            >
              <SignOut size={20} weight="fill" />
              Sair
            </button>
          </nav>
        </div>
      </header>
    )
  }

  return <>{component}</>
}

export default Navbar
