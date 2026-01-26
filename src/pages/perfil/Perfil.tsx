import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"



import {
  PencilSimpleLine,
  Notebook,
  At,
  UserCircle,
  Sparkle,
} from "@phosphor-icons/react"

function Perfil() {
  const navigate = useNavigate()
  const { usuario } = useContext(AuthContext)

  const handleEditarPerfil = () => {
    navigate("/editar-perfil")
  }

  const handleMeusPosts = () => {
    navigate(`/posts/usuario/${usuario.id}`)
  }

  useEffect(() => {
    if (usuario.token === "") {
      ToastAlerta("Você precisa estar logado!", "info")
      navigate("/")
    }
  }, [usuario.token, navigate])

  const foto =
    usuario.foto && usuario.foto.trim() !== ""
      ? usuario.foto
      : "https://i.imgur.com/4ZQZ4Zy.png"

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-zinc-50 to-white flex justify-center px-4 py-10">
      <div className="w-full max-w-5xl rounded-[2.5rem] overflow-hidden shadow-2xl bg-white border border-white/60">

        <div className="relative h-80 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />

          <div className="absolute -top-10 -left-10 w-52 h-52 rounded-full bg-white/15 blur-2xl" />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-white/15 blur-2xl" />
          <div className="absolute top-10 right-16 w-20 h-20 rounded-full bg-white/10 blur-xl" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">

            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-white/25 blur-md" />
              <img
                className="relative w-36 h-36 rounded-full border-4 border-white shadow-xl object-cover"
                src={foto}
                alt={`Foto de perfil de ${usuario.nome}`}
                onError={(e) => (e.currentTarget.src = "https://i.imgur.com/4ZQZ4Zy.png")}
              />

              <button
                type="button"
                onClick={handleEditarPerfil}
                className="absolute -bottom-2 -right-2 w-11 h-11 rounded-full bg-white text-purple-600 shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition"
                aria-label="Editar perfil"
                title="Editar perfil"
              >
                <PencilSimpleLine size={20} weight="bold" />
              </button>
            </div>

            <h1 className="mt-5 text-4xl font-extrabold text-white drop-shadow-sm">
              {usuario.nome}
            </h1>

            <p className="text-white/85 flex items-center gap-2 justify-center mt-1">
              <At size={18} weight="bold" />
              {usuario.usuario}
            </p>

            <div className="mt-4 flex items-center gap-2 text-white/80">
              <Sparkle size={18} weight="fill" />
              <span className="text-sm">
                Meu cantinho para compartilhar tech, criatividade e aprendizados!
              </span>
            </div>
          </div>
        </div>

        <div className="px-6 pb-10">
          <div className="w-28 h-1.5 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mx-auto my-7" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="rounded-2xl bg-zinc-50 border border-zinc-100 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-purple-600 font-semibold">
                <UserCircle size={22} weight="fill" />
                Perfil
              </div>
              <p className="text-zinc-600 mt-2 text-sm">
                Personalize sua foto, nome e dados de acesso.
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-50 border border-zinc-100 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-purple-600 font-semibold">
                <At size={22} weight="fill" />
                Email
              </div>
              <p className="text-zinc-600 mt-2 text-sm break-all">
                {usuario.usuario}
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-50 border border-zinc-100 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-purple-600 font-semibold">
                <Notebook size={22} weight="fill" />
                Conteúdo
              </div>
              <p className="text-zinc-600 mt-2 text-sm">
                Veja e gerencie as suas postagens.
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mt-6 rounded-2xl bg-white border border-zinc-100 p-7 shadow-sm">
            <p className="text-zinc-700 leading-relaxed text-center">
              Bem-vindo(a) ao meu espaço pessoal.
              <br />
              Aqui compartilho ideias, projetos e aprendizados sobre tecnologia,
              criatividade e desenvolvimento web.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Perfil
