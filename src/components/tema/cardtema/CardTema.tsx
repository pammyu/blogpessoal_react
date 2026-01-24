import { Link } from "react-router-dom"
import type Tema from "../../../models/Tema"

interface CardTemaProps {
  tema: Tema
}

function CardTema({ tema }: CardTemaProps) {
  return (
    <div className="flex flex-col justify-between rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
      
      <header className="px-6 py-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white">
        <h2 className="text-lg font-semibold tracking-wide">
          {tema.titulo}
        </h2>
      </header>

      <div className="p-6 text-slate-600 flex-1">
        <p className="text-base leading-relaxed">
          {tema.descricao}
        </p>
      </div>

      <div className="flex border-t border-slate-200">
        <Link
          to={`/editartema/${tema.id}`}
          className="flex-1 py-3 text-center font-medium text-pink-400 hover:bg-purple-50 transition"
        >
          Editar
        </Link>

        <Link
          to={`/deletartema/${tema.id}`}
          className="flex-1 py-3 text-center font-medium text-pink-400 hover:bg-pink-50 transition"
        >
          Deletar
        </Link>
      </div>
    </div>
  )
}

export default CardTema
