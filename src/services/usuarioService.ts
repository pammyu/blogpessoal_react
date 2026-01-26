import { api } from "./api"
import type Usuario from "../models/Usuario"

export async function buscarUsuarioPorId(id: number, token: string) {
  const response = await api.get<Usuario>(`/usuarios/${id}`, {
    headers: { Authorization: token },
  })
  return response.data
}

export async function atualizarUsuario(id: number, usuario: Partial<Usuario>, token: string) {
  const response = await api.put<Usuario>(`/usuarios/${id}`, usuario, {
    headers: { Authorization: token },
  })
  return response.data
}
