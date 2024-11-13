import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-tl from-background from-20% to-gradientcolor to-100% w-full h-52 flex flex-col z-[3] justify-end items-center px-8">
             <ul className=" flex flex-col justify-center items-center gap-8">
                <Link href={"/"} className="">Sobre</Link>
                <Link href={"/"} className="">Redes Sociais</Link>
                <Link href={"/"} className="">Contato</Link> 
             </ul>
        </footer>
    );
}

export default Footer;