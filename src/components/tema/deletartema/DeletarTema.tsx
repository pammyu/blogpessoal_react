import { useNavigate, useParams } from "react-router-dom"
import type Tema from "../../../models/Tema"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import { buscar, deletar } from "../../../services/Service"
import { ClipLoader } from "react-spinners"

function DeletarTema() {

    const navigate = useNavigate()
    const [tema, setTema] = useState<Tema>({} as Tema)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: {
                    Authorization: token
                }
            })
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert("Você precisa estar logado")
            navigate("/")
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarTema() {
        setIsLoading(true)

        try {
            await deletar(`/temas/${id}`, {
                headers: {
                    Authorization: token
                }
            })

            alert ("Tema deletado com sucesso!")
        
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout()
            } else {
                alert('Erro ao deletar o tema.')
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate('/temas')
    }


  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4">Deletar tema</h1>
      <p className="text-center font-semibold mb-4">
        Você tem certeza de que deseja apagar o tema a seguir?</p>
        <div className="flex flex-col justify-between rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
            <header className="px-6 py-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white">
                Tema
            </header>
            <p className='p-8 text-3xl bg-pink-50 h-full'>{tema.descricao}</p>
            <div className="flex">
                <button className='flex-1 py-3 text-center font-medium text-pink-400 hover:bg-purple-100'
                    onClick={retornar}>
                    Não
                </button>

                <button className="flex-1 py-3 text-center font-medium text-pink-500 hover:bg-pink-100"
                    onClick={deletarTema}>

                {
                    isLoading ? <ClipLoader color="#ff69b4" size={20} /> : 
                    <span>Sim</span>
                }
                </button>
            </div>
        </div>
    </div>
  )
} 
export default DeletarTema