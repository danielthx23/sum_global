export default function SobrePlataforma() {
    return (
      <div className="px-6 py-12 max-w-7xl mx-auto">
        {/* Plataforma Title Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800">SUM+</h2>
        </section>
  
        {/* Recursos Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recursos</h2>
          <div className="text-gray-600 text-base leading-relaxed">
            A plataforma SUM+ oferece funcionalidades exclusivas para conectar consumidores e fornecedores de energia limpa:
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Venda de energia excedente por consumidores a preços competitivos.</li>
              <li>Conexão direta com fornecedores de energia renovável.</li>
              <li>Facilidade no gerenciamento de transações de energia.</li>
              <li>Transparência e eficiência em todas as negociações.</li>
            </ul>
          </div>
        </section>
  
        {/* A Ideia Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">A Ideia</h2>
          <p className="text-gray-600 text-base leading-relaxed">
            A SUM+ foi criada com o objetivo de transformar a maneira como energia é vendida e consumida. 
            Conectamos quem possui energia excedente com quem precisa de soluções limpas e renováveis, 
            tornando o processo acessível, transparente e rentável para ambas as partes.
          </p>
        </section>
  
        {/* Protótipo Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Protótipo</h2>
          <p className="text-gray-600 text-base leading-relaxed">
            O protótipo da plataforma SUM+ inclui ferramentas avançadas para:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>Identificação de energia excedente e potencial de venda.</li>
            <li>Matchmaking inteligente entre fornecedores e consumidores.</li>
            <li>Acompanhamento em tempo real das transações de energia.</li>
          </ul>
          <p className="text-gray-600 text-base leading-relaxed mt-4">
            Nosso protótipo prioriza a facilidade de uso, permitindo uma experiência intuitiva e eficiente para todos os usuários.
          </p>
        </section>
  
        {/* Público-Alvo Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Público-Alvo</h2>
          <p className="text-gray-600 text-base leading-relaxed">
            A SUM+ atende a diferentes perfis de usuários:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>Consumidores domésticos com geração de energia solar ou eólica.</li>
            <li>Empresas interessadas em reduzir custos com energia renovável.</li>
            <li>Fornecedores de energia limpa buscando novos mercados.</li>
          </ul>
        </section>
      </div>
    );
  }