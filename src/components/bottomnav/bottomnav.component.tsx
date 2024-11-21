'use client'

import { FaChargingStation } from "react-icons/fa";
import HoverItem from "../hoveritem/hoveritem.component";
import { MdForum } from "react-icons/md";
import { FaCertificate } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import LinkRedirectIcon from "../linkredirecticon/linkredirecticon.component";
import useAuth from "@/hooks/useauth/useauth.hook";

const BottomNav = () => {
  const { usuario } = useAuth();
  
  const itemFornecedores = [
    usuario?.valorToken && <LinkRedirectIcon label="Meus fornecimentos" link={`/fornecimentos/usuario`} icon={<IoPerson />} />,
    <LinkRedirectIcon label="Todos fornecimentos" link="/fornecimentos" icon={<FaChargingStation />} />
  ].filter(Boolean);
  
  const itemForum = [
    usuario?.valorToken && <LinkRedirectIcon label="Meus Posts" link={`/posts/usuario`} icon={<IoPerson />} />,
    <LinkRedirectIcon label="Todos Posts" link="/posts" icon={<MdForum />} />
  ].filter(Boolean);
  
  const itemCertificados = [
    usuario?.valorToken && <LinkRedirectIcon label="Meus certificados" link={`/certificados/usuario`}  icon={<IoPerson />} />,
  ].filter(Boolean);

  return (
    <nav className='w-full border-b border-foregroundopacity20 px-[5%] py-4 hidden sm:hidden md:hidden lg:hidden xl:block 2xl:block'>
      <ul className="flex gap-10">
        <HoverItem icon={<FaChargingStation />} itemTitle={"Fornecedores"} placement='bottom' tooltipItems={itemFornecedores} />
        <HoverItem icon={<MdForum />} itemTitle={"Forum"} placement='bottom' tooltipItems={itemForum} />
        {usuario?.valorToken && <HoverItem icon={<FaCertificate />} itemTitle={"Certificados"} placement='bottom' tooltipItems={itemCertificados} />}
      </ul>
    </nav>
  );
}

export default BottomNav;