import { useState, useContext, useEffect, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../../contexts/AuthContext"
import type Postagem from "../../../models/Postagem"
import type Tema from "../../../models/Tema"
import { buscar, atualizar, cadastrar } from "../../../services/api"
import { ToastAlerta } from "../../../utils/ToastAlerta"

type Modo = "page" | "modal"

interface FormPostagemProps {
  modo?: Modo
  onClose?: () => void
}

function FormPostagem({ modo = "page", onClose }: FormPostagemProps) {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [temas, setTemas] = useState<Tema[]>([])
  const [tema, setTema] = useState<Tema>({ id: 0, descricao: "" })
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

  const { id } = useParams<{ id: string }>()

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  async function buscarPostagemPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: { Authorization: token },
      })
    } catch (error: any) {
      if (error?.toString().includes("401")) {
        ToastAlerta("Sessão expirada. Faça login novamente!", "info")
        handleLogout()
      } else {
        ToastAlerta("Erro ao carregar a postagem!", "erro")
      }
    }
  }

  async function buscarTemas() {
    try {
      await buscar("/temas", setTemas, {
        headers: { Authorization: token },
      })
    } catch (error: any) {
      if (error?.toString().includes("401")) {
        ToastAlerta("Sessão expirada. Faça login novamente!", "info")
        handleLogout()
      } else {
        ToastAlerta("Erro ao carregar temas!", "erro")
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
    if (token === "") return

    buscarTemas()

    if (id !== undefined) {
      buscarPostagemPorId(id)
    }
  }, [id, token])

  useEffect(() => {
    if (postagem?.tema) {
      setTema(postagem.tema)
    }
  }, [postagem])

  useEffect(() => {
    setPostagem((prev) => ({
      ...prev,
      tema: tema,
      usuario: usuario,
    }))
  }, [tema, usuario])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
    })
  }

  function retornar() {
    navigate("/postagens")
  }

  async function gerarNovaPostagem(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (id !== undefined) {
        await atualizar("/postagens", postagem, setPostagem, {
          headers: { Authorization: token },
        })
        ToastAlerta("Postagem atualizada com sucesso!", "sucesso")
      } else {
        await cadastrar("/postagens", postagem, setPostagem, {
          headers: { Authorization: token },
        })
        ToastAlerta("Postagem cadastrada com sucesso!", "sucesso")
      }

      if (modo === "modal") {
        onClose?.()
        return
      }

      retornar()
    } catch (error: any) {
      if (error?.toString().includes("401")) {
        ToastAlerta("Sessão expirada. Faça login novamente!", "info")
        handleLogout()
      } else {
        ToastAlerta("Erro ao salvar a postagem!", "erro")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const formConteudo = (
    <>
      <h1 className="text-3xl font-bold text-purple-500 text-center mb-6">
        {id ? "Editar Postagem" : "Cadastrar Postagem"}
      </h1>

      <form onSubmit={gerarNovaPostagem} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-purple-500 font-semibold">Título da Postagem</label>
          <input
            type="text"
            name="titulo"
            value={postagem.titulo || ""}
            onChange={atualizarEstado}
            required
            className="border-2 border-purple-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-300 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-purple-500 font-semibold">Texto da Postagem</label>
          <textarea
            name="texto"
            value={postagem.texto || ""}
            onChange={atualizarEstado}
            required
            className="border-2 border-purple-200 rounded-xl px-4 py-3 min-h-32 resize-none focus:ring-2 focus:ring-pink-300 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-purple-500 font-semibold">Tema da Postagem</label>

          <select
            required
            className="border-2 border-purple-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-300 outline-none"
            onChange={(e) =>
              setTema(temas.find((t) => t.id === Number(e.target.value))!)
            }
            value={tema.id ? String(tema.id) : ""}
          >
            <option value="">Selecione um tema</option>
            {temas.map((t) => (
              <option key={t.id} value={t.id}>
                {t.descricao}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold py-3 rounded-2xl mt-2 hover:from-pink-500 hover:to-purple-500 transition-all duration-300 shadow-md flex justify-center"
        >
          {isLoading ? (
            <ClipLoader color="#fff" size={22} />
          ) : (
            <span>{id ? "Atualizar" : "Cadastrar"}</span>
          )}
        </button>

        {modo === "modal" && (
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-2xl border border-zinc-200 text-zinc-700 font-semibold hover:bg-zinc-50 transition"
          >
            Cancelar
          </button>
        )}
      </form>
    </>
  )

  if (modo === "modal") {
    return <div className="bg-white">{formConteudo}</div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {formConteudo}
      </div>
    </div>
  )
}

export default FormPostagem
