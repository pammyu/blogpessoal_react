import { useNavigate } from "react-router-dom";
import CardPostagem from "../cardpostagem/CardPostagem";
import type Postagem from "../../../models/Postagem";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { SyncLoader } from "react-spinners";

function ListaPostagens() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postagem, setPostagem] = useState<Postagem[]>([])

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarPostagens()
    }, [postagem.length])

    async function buscarPostagens() {
        try {
            setIsLoading(true)

            await buscar('/postagens', setPostagem, {
                headers: { Authorization: token }
            })

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {isLoading && (
                <div className='flex justify-center w-full my-8'>
                    <SyncLoader 
                        color='violet'
                        size={32}
                    />
                </div>
            )}

            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col mx-2">

                    {(!isLoading && postagem.length === 0) && (
                        <span className="text-3xl text-center my-8">
                            Nenhuma postagem foi encontrada!
                        </span>
                    )}

                    <div className='container mx-auto my-4 
                        grid grid-cols-1 md:grid-cols-2 
                        lg:grid-cols-3 gap-4'>
                        {
                            postagem.map((postagem) => (
                                <CardPostagem key={postagem.id} postagem={postagem} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaPostagens;