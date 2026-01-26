import { api } from "./api"
import type Postagem from "../models/Postagem"

export async function listarPostagensPorUsuario(idUsuario: number, token: string) {
  const response = await api.get<Postagem[]>(`/postagens/usuario/${idUsuario}`, {
    headers: { Authorization: token },
  })
  return response.data
}