import { createContext, type ReactNode, useState } from "react"
import type UsuarioLogin from "../models/UsuarioLogin"
import { login } from "../services/Service"


interface AuthContextProps {
    usuario: UsuarioLogin 
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({children}: AuthProviderProps) {

    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '', 
        token: ''
    })

    const [isLoading, setIsLoading] = useState(false)

    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true)
        try {
            await login('/usuarios/logar', usuarioLogin, (data: UsuarioLogin) => { 
                setUsuario(data)
                localStorage.setItem('token', data.token)
            })
            alert('Login feito com sucesso!')
        } catch (error) {
            alert('Erro ao logar! Verifique os dados informados.')
        }
        setIsLoading(false)
    }

    function handleLogout() {
        setUsuario({
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: '',
            token: ''   
        })     
        localStorage.removeItem('token')
    }

    return (
        <AuthContext.Provider value={{usuario, handleLogin, handleLogout, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}