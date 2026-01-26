import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../../contexts/AuthContext"
import type Tema from "../../../models/Tema"
import { atualizar, buscar, cadastrar } from "../../../services/Service"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function FormTema() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const [tema, setTema] = useState<Tema>({ id: 0, descricao: "" })

  const { id } = useParams<{ id: string }>()
  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  async function buscarTemaPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, { headers: { Authorization: token } })
    } catch (error: any) {
      if (error?.toString().includes("401")) {
        ToastAlerta("Sessão expirada. Faça login novamente!", "info")
        handleLogout()
      } else {
        ToastAlerta("Erro ao buscar tema!", "erro")
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
    if (id) buscarTemaPorId(id)
  }, [id])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setTema((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  function retornar() {
    navigate("/temas")
  }

  async function salvarTema(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (id) {
        await atualizar("/temas", tema, setTema, { headers: { Authorization: token } })
        ToastAlerta("Tema atualizado com sucesso!", "sucesso")
      } else {
        await cadastrar("/temas", tema, setTema, { headers: { Authorization: token } })
        ToastAlerta("Tema cadastrado com sucesso!", "sucesso")
      }
      retornar()
    } catch (error: any) {
      if (error?.toString().includes("401")) {
        ToastAlerta("Sessão expirada. Faça login novamente!", "info")
        handleLogout()
      } else {
        ToastAlerta("Erro ao salvar o tema!", "erro")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-purple-500 text-center mb-6">
          {id ? "Editar Tema" : "Cadastrar Tema"}
        </h1>

        <form onSubmit={salvarTema} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-purple-500 font-semibold">Descrição</label>
            <textarea
              name="descricao"
              value={tema.descricao}
              onChange={atualizarEstado}
              required
              placeholder="Escreva uma descrição para o tema..."
              className="border-2 border-purple-200 rounded-xl px-4 py-3 min-h-28 resize-none focus:ring-2 focus:ring-pink-300 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold py-3 rounded-2xl mt-2 hover:from-pink-500 hover:to-purple-500 transition-all duration-300 shadow-md flex justify-center"
          >
            {isLoading ? <ClipLoader color="#fff" size={22} /> : <span>{id ? "Atualizar" : "Cadastrar"}</span>}
          </button>

          <button
            type="button"
            onClick={retornar}
            className="w-full py-3 rounded-2xl border border-zinc-200 text-zinc-700 font-semibold hover:bg-zinc-50 transition"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  )
}

export default FormTema
