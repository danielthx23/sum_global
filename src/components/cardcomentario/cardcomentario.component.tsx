import React from 'react';
import Comentario from "@/types/comentario/comentario.type"; // Adjust the import path as needed

interface CommentaryProps {
    comentario: Comentario;
}

const Commentary: React.FC<CommentaryProps> = ({ comentario }) => {
    return (
        <div className="border-b border-gray-300 p-4">
            <div className="flex items-center mb-2">
                <img src={comentario.usuario.imagemFoto} alt={comentario.usuario.nomeUsuario} className="w-10 h-10 rounded-full mr-2" />
                <h4 className="font-semibold">{comentario.usuario.nomeUsuario}</h4>
            </div>
            <h5 className="font-bold">{comentario.titulo}</h5>
            <p>{comentario.texto}</p>
        </div>
    );
};

export default Commentary;