import { Link } from 'react-router-dom'
import type Postagem from '../../../models/Postagem'

interface CardPostagemProps {
    postagem: Postagem
}

function CardPostagem({postagem}: CardPostagemProps) {
    return (
         <div className='bg-white rounded-2xl shadow-md overflow-hidden flex flex-col justify-between w-80'>

            <div>
                <div className='bg-gradient-to-r from-pink-400 to-purple-400 text-white py-4 px-4 text-center'>
                    <img src='{postagem.usuario?.foto}' 
                    className='h-12 rounded-full'
                    alt='Imagem do usuário' />
                    <h3 className='text-lg font-bold uppercase'>
                        {postagem.usuario?.nome}
                    </h3>
                </div>
                <div className='p-4'>
                    <h4 className='text-lg font-semibold mb-2'>{postagem.titulo}</h4>
                    <p className='text-slate-600 mb-2'>{postagem.texto}</p>
                    <p className='text-sm text-slate-500'>Tema: {postagem.tema?.descricao}</p>
                    <p className='text-sm text-slate-500'>Data: {new Intl.DateTimeFormat('pt-BR', { 
                    dateStyle: 'full',
                    timeStyle: 'medium',
                    }).format(new Date(postagem.data))}</p>
                </div>
            </div>
            <div className='flex'>
                <Link to={`/editarpostagem/${postagem.id}`} className='w-full text-pink-400 hover:text-purple-400 flex items-center justify-center py-3 font-medium transition'>
                <button>Editar</button>
                </Link>
                <Link to={`/deletarpostagem/${postagem.id}`} 
                className='w-full text-pink-400 hover:text-purple-400 flex items-center justify-center py-3 font-medium transition'>
                    <button>Deletar</button>
                </Link>
            </div>

        </div>
    )
}

export default CardPostagem