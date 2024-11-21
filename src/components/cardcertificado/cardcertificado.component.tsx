// components/certificado/CardCertificado.tsx

import React from 'react';
import Certificado from '@/types/certificado/certificado.type'; // Import the Certificado type

interface CardCertificadoProps {
  certificado: Certificado; // Expect a Certificado object as a prop
}

const CardCertificado: React.FC<CardCertificadoProps> = ({ certificado }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md mb-4">
      <h2 className="text-xl font-bold">{certificado.nomeCertificado}</h2>
      <p className="text-gray-700">{certificado.descricao}</p>
      <p className="text-gray-600">Método de Obtenção: {certificado.metodoObter}</p>
    </div>
  );
};

export default CardCertificado;