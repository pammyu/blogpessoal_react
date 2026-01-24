import type Postagem from "./Postagem"

export default interface Tema {
  id: number
  titulo: string
  descricao: string
  postagem?: Postagem[] | null
}
