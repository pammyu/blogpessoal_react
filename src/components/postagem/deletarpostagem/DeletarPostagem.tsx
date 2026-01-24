import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Postagem from "../../../models/Postagem"
import { buscar, deletar } from "../../../services/Service"
import { ClipLoader } from "react-spinners"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarPostagem() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

  const { id } = useParams<{ id: string }>()

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  async function buscarPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: { Authorization: token },
      })
    } catch (error: any) {
      if (error?.toString().includes("401")) {
        ToastAlerta("Sessão expirada. Faça login novamente!", "info")
        handleLogout()
      } else {
        ToastAlerta("Erro ao carregar a postagem.", "erro")
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info")
      navigate("/")
      return
    }
  }, [token, navigate])

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  async function deletarPostagem() {
    if (!id) return

    setIsLoading(true)

    try {
      await deletar(`/postagens/${id}`, {
        headers: { Authorization: token },
      })

      ToastAlerta("Postagem apagada com sucesso!", "sucesso")
      retornar()
    } catch (error: any) {
      if (error?.toString().includes("401")) {
        ToastAlerta("Sessão expirada. Faça login novamente!", "info")
        handleLogout()
      } else {
        ToastAlerta("Erro ao deletar a postagem.", "erro")
      }
    } finally {
      setIsLoading(false)
    }
  }

  function retornar() {
    navigate("/postagens")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-purple-500 text-center mb-4">
          Deletar Postagem
        </h1>

        <p className="text-center font-semibold text-slate-600 mb-6">
          Você tem certeza que deseja apagar a postagem?
        </p>

        <div className="border border-purple-200 rounded-xl overflow-hidden">
          <header className="py-3 px-6 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold text-xl">
            Postagem
          </header>

          <div className="p-4 flex flex-col gap-2 text-slate-700">
            <p className="text-lg font-semibold">{postagem.titulo}</p>
            <p className="text-sm">{postagem.texto}</p>
          </div>

          <div className="flex">
            <button
              type="button"
              className="w-full py-3 bg-purple-300 text-white font-semibold hover:bg-purple-500 transition-all duration-300"
              onClick={retornar}
              disabled={isLoading}
            >
              Não
            </button>

            <button
              type="button"
              className="w-full py-3 bg-pink-300 text-white font-semibold hover:bg-pink-500 transition-all duration-300 flex justify-center"
              onClick={deletarPostagem}
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader color="violet" size={24} /> : <span>Sim</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeletarPostagem
