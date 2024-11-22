'use client'

import React from 'react';
import Comentario from "@/types/comentario/comentario.type"; // Adjust the import path as needed
import Image from 'next/image';
import AlterDeleteTooltip from '../alterdeletetooltip/alterdeletetooltip.component';
import useAuth from '@/hooks/useauth/useauth.hook';

interface CardComentarioProps {
    comentario: Comentario;
}

const CardComentario = ({ comentario }: CardComentarioProps) => {
    const { usuario } = useAuth();
    return (
        <div className="border-b border-gray-300 p-4">
            <div className="flex items-center mb-2">
                <Image src={comentario.usuario.imagemFoto ? comentario.usuario.imagemFoto : "https://shopify.dev/assets/templated-apis-screenshots/pos-ui-extensions/2024-10/image-default.png"} width={300} height={300} alt={comentario.usuario.nomeUsuario} className="w-10 h-10 rounded-full mr-2" />
                <h4 className="font-semibold">{comentario.usuario.nomeUsuario}</h4>
                {usuario?.idUsuario === comentario.usuario.idUsuario && <AlterDeleteTooltip postId={comentario.idComentario} path={'/comentarios'}/>}
            </div>
            <h5 className="font-bold">{comentario.titulo}</h5>
            <p>{comentario.texto}</p>
        </div>
    );
};

export default CardComentario;