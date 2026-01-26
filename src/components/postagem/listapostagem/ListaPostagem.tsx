import { useNavigate } from "react-router-dom"
import CardPostagem from "../cardpostagem/CardPostagem"
import type Postagem from "../../../models/Postagem"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import { buscar } from "../../../services/api"
import { SyncLoader } from "react-spinners"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function ListaPostagens() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [postagens, setPostagens] = useState<Postagem[]>([])

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info")
      navigate("/")
      return
    }

    buscarPostagens()
  }, [token])

  async function buscarPostagens() {
    try {
      setIsLoading(true)

      await buscar("/postagens", setPostagens, {
        headers: { Authorization: token },
      })
    } catch (error: any) {
      if (error?.toString().includes("401")) {
        ToastAlerta("Sessão expirada. Faça login novamente!", "info")
        handleLogout()
      } else {
        ToastAlerta("Erro ao carregar postagens!", "erro")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <SyncLoader color="violet" size={32} />
        </div>
      )}

      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col mx-2">
          {!isLoading && postagens.length === 0 && (
            <span className="text-3xl text-center my-8">
              Nenhuma postagem foi encontrada!
            </span>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-6">
            {postagens.map((postagem) => (
              <CardPostagem key={postagem.id} postagem={postagem} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ListaPostagens
