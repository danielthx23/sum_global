'use client'

import UsuarioLogin from "@/types/usuariologin/usuariologin.type"
import { createContext } from "react"

interface AuthContextProps {
    usuario: UsuarioLogin | null
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
}

export const AuthContext = createContext({} as AuthContextProps)

export default AuthContext