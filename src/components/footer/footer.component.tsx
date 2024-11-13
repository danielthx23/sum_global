import Link from "next/link";
import { LiaInstagram, LiaLinkedin, LiaTwitter } from "react-icons/lia";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-tl text-foreground from-background from-20% to-gradientcolor to-100% w-full h-52 flex flex-col z-[3] justify-center items-center gap-4 px-8">
             <ul className=" flex flex-col justify-center items-center gap-4">
                <Link href={"/"} className="">Sobre</Link>
                <Link href={"/"} className="">Redes Sociais</Link>
                <Link href={"/"} className="">Contato</Link> 
             </ul>
             <ul className="flex justify-center items center gap-4">
                <Link href={"/"}><LiaLinkedin className="w-8 h-8" /></Link>
                <Link href={"/"}><LiaInstagram className="w-8 h-8" /></Link>
                <Link href={"/"}><LiaTwitter className="w-8 h-8"/></Link>
             </ul>
        </footer>
    );
}

export default Footer;