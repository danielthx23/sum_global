'use client';

import { PropsWithChildren, useEffect, useState } from "react";
import AuthContext from "./authcontext.context";
import UsuarioLogin from "@/types/usuariologin/usuariologin.type";
import { FormState } from "@/hooks/useform/useform.hook";
import { toastAlerta } from "@/utils/toastalert/toastalert.util";
import { useRouter } from "next/navigation";

/* eslint-disable @typescript-eslint/no-empty-object-type */
interface AuthProviderProps extends PropsWithChildren {}

export function AuthProvider({ children }: AuthProviderProps) {
    const router = useRouter()
    const [usuario, setUsuario] = useState<UsuarioLogin | null>(null);

    async function handleLogin(usuarioLogin: FormState) {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuarioLogin),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Login failed');
            }
    
            const data = await response.json();
    
            setUsuario(data); 
    
            localStorage.setItem('authToken', data.token || `${usuarioLogin.cnpj || usuarioLogin.cpf}.${usuarioLogin.numeroSenha}`);
            toastAlerta("Usuário logado com sucesso!", "sucesso");
            router.push("/");
        } catch (error) {
            const errorMessage = error instanceof Error && error.message 
        ? error.message 
        : "Ocorreu um erro inesperado ao fazer login.";

    toastAlerta("Falha ao fazer Login: " + errorMessage, 'info');
        }
    }

    function handleLogout() {
        setUsuario(null);
        localStorage.removeItem('authToken');
    }

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const [identifier, password] = token.split('.');
    
            if (identifier && password) {
                handleLogin({ numeroSenha: password, cpf: identifier, cnpj: identifier}); 
            } else {
                handleLogout(); 
            }
        } else {
            handleLogout(); 
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}
