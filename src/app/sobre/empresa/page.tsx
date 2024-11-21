import Image from 'next/image';

const SobreEmpresa: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full bg-black p-24 text-white">
      {/* Section 1 */}
      <section className="flex flex-col items-center mb-16 p-16 gap-12">
        <Image src={'swag'} alt="Worldwide Tech" width={400} height={400} />
        <h1 className="text-2xl font-bold">Sobre a Worldwide Tech</h1>
        <p className="text-base leading-7">
          A Worldwide Tech é uma empresa dedicada a desenvolver soluções inovadoras em software e aplicativos que impulsionam a inteligência artificial além das fronteiras, transformando a maneira como as pessoas vivem e trabalham.
        </p>
        <p className="text-base leading-7">
          Nossa missão é liderar a revolução tecnológica global, estabelecendo-se como referência na criação de inteligência artificial e soluções de software de ponta. Nossos valores incluem inovação sem fronteiras, impacto positivo, colaboração e diversidade.
        </p>
      </section>

      {/* Section 2 */}
      <section className="flex flex-col items-center mb-16 p-16">
        <h1 className="text-2xl font-bold">Desenvolvedores</h1>
        <div className="flex gap-8 mt-8">
          <h1 className="text-base font-semibold text-center w-48">Daniel Akiyama RM: 558263</h1>
          <h1 className="text-base font-semibold text-center w-48">João Pedro RM: 558199</h1>
          <h1 className="text-base font-semibold text-center w-48">Danilo Correia RM: </h1>
        </div>
      </section>

      {/* Section 3 */}
      <section className="flex flex-col items-center mb-16 p-16 gap-6">
        <h2 className="text-xl font-bold">Missão, Visão e Valores</h2>
        <p className="text-base leading-7">
          <strong>Missão:</strong> Desenvolver soluções inovadoras em software e aplicativos que impulsionem a inteligência artificial além das fronteiras.
        </p>
        <p className="text-base leading-7">
          <strong>Visão:</strong> Liderar a revolução tecnológica global, estabelecendo-se como referência na criação de inteligência artificial e soluções de software de ponta.
        </p>
        <p className="text-base leading-7">
          <strong>Valores:</strong> Inovação sem fronteiras, impacto positivo, colaboração e diversidade.
        </p>
      </section>

      {/* Section 4 */}
      <section className="flex flex-col items-center mb-16 p-16">
        <h2 className="text-xl font-bold">Posicionamento de Marca</h2>
        <p className="text-base leading-7 mt-4">
          Worldwide Tech - Transformando ideias em realidade. Nossa tecnologia, sua excelência. Oferecemos soluções tecnológicas sob medida para impulsionar o seu negócio. Conectamos inovação com resultados tangíveis.
        </p>
      </section>
    </div>
  );
};

export default SobreEmpresa;
