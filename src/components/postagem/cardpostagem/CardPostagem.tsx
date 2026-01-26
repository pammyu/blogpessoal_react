import { Link } from "react-router-dom"
import type Postagem from "../../../models/Postagem"

interface CardPostagemProps {
  postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagemProps) {
  const foto =
    postagem.usuario?.foto && postagem.usuario.foto.trim() !== ""
      ? postagem.usuario.foto
      : "https://i.imgur.com/4ZQZ4Zy.png"

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col justify-between w-80 border border-white/60 hover:shadow-xl transition">
      
      <div className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-5 py-6 relative">
        
        <img
          src={foto}
          alt={`Imagem de ${postagem.usuario?.nome ?? "usuário"}`}
          onError={(e) => (e.currentTarget.src = "https://i.imgur.com/4ZQZ4Zy.png")}
          className="
            h-14 w-14 rounded-full object-cover 
            border-4 border-white/70 shadow-md
            absolute -bottom-7 left-1/2 -translate-x-1/2
          "
        />

        <h3 className="text-lg font-extrabold uppercase text-center tracking-wide mt-2">
          {postagem.usuario?.nome}
        </h3>
      </div>

      <div className="p-5 pt-10">
        <h4 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
          {postagem.titulo}
        </h4>

        <p className="text-slate-600 mb-4 leading-relaxed line-clamp-3">
          {postagem.texto}
        </p>

        <div className="space-y-1 text-sm text-slate-500">
          <p>
            <span className="font-semibold text-slate-600">Tema:</span>{" "}
            {postagem.tema?.descricao}
          </p>

          <p>
            <span className="font-semibold text-slate-600">Data:</span>{" "}
            {new Intl.DateTimeFormat("pt-BR", {
              dateStyle: "full",
              timeStyle: "medium",
            }).format(new Date(postagem.data))}
          </p>
        </div>
      </div>

      <div className="flex gap-3 px-5 pb-5">
        <Link
          to={`/editarpostagem/${postagem.id}`}
          className="
            w-full text-center py-2 rounded-xl font-semibold
            border border-pink-300 text-pink-500
            hover:bg-pink-50 transition
          "
        >
          Editar
        </Link>

        <Link
          to={`/deletarpostagem/${postagem.id}`}
          className="
            w-full text-center py-2 rounded-xl font-semibold
            border border-purple-300 text-purple-500
            hover:bg-purple-50 transition
          "
        >
          Deletar
        </Link>
      </div>
    </div>
  )
}

export default CardPostagem
