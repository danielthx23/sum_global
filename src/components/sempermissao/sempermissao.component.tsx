import { BiBlock } from "react-icons/bi"

const SemPermissao = () => {
    return (
        <main className="w-full h-screen flex flex-col justify-center items-center text-center text-foregroundlight gap-4">
            <BiBlock className="text-[5rem]"/>
            <h1 className="font-black text-2xl">Sem acesso</h1>
            <h2 className="text-lg">Você não tem permissão para acessar esse recurso.</h2>
        </main>
    )
}

export default SemPermissao