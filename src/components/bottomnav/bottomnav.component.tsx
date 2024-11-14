import { FaChargingStation } from "react-icons/fa"
import HoverItem from "../hoveritem/hoveritem.component"
import { MdForum } from "react-icons/md"
import { FaCertificate } from "react-icons/fa";
import { IoPerson } from "react-icons/io5"

const BottomNav = () => {
  const itemFornecedores = [{ label: 'Meus fornecimentos>', link: '/fornecimentos', icon: <IoPerson /> }, { label: 'Todos fornecimentos', link: '/fornecimentos', icon: <FaChargingStation /> }]
  const itemForum = [{ label: 'Meus Posts', link: '/posts', icon: <IoPerson /> }, { label: 'Todos Posts', link: '/posts', icon: <MdForum /> }]
  const itemCertificados = [{ label: 'Todos meus certificados', link: '/certificados', icon: <IoPerson /> }]

  return (
    <nav className='w-full border-b border-foregroundopacity20 px-[5%] py-4 hidden sm:hidden md:hidden lg:hidden xl:block 2xl:block'>
      <ul className="flex gap-10">
        <HoverItem icon={<FaChargingStation />} itemTitle={"Fornecedores"} placement='bottom' tooltipItems={itemFornecedores} />
        <HoverItem icon={<MdForum />} itemTitle={"Forum"} placement='bottom' tooltipItems={itemForum} />
        <HoverItem icon={<FaCertificate />} itemTitle={"Certificados"} placement='bottom' tooltipItems={itemCertificados} />
      </ul>
    </nav>
  )
}

export default BottomNav;