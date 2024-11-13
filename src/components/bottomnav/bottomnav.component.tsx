import { BiCalendar } from "react-icons/bi"
import { BsWrench } from "react-icons/bs"
import { FaCar } from "react-icons/fa"
import { GrWorkshop } from "react-icons/gr"
import HoverItem from "../hoveritem/hoveritem.component"

const BottomNav = () => {
  const itemVeiculos = [{ label: 'Meus Veículos', link: '/veiculo', icon: <FaCar /> }]
  const itemServicos = [{ label: 'Serviços Gratuitos Para Segurados', link: '/servicos/gratisParaSegurado=true', icon: <BsWrench /> }, { label: 'Todos os Serviços', link: '/servicos', icon: <BsWrench /> }]
  const itemOficinas = [{ label: 'Oficinas Porto', link: '/oficinas/oficinaPorto=true', icon: <GrWorkshop /> }, { label: 'Todas Oficinas', link: '/oficinas', icon: <GrWorkshop /> }]
  const itemAgendamentos = [{ label: 'Todos Agendamentos', link: '/agendamentos', icon: <BiCalendar /> }]

  return (
    <nav className='w-full border-b border-foregroundopacity20 px-[5%] py-4 hidden sm:hidden md:hidden lg:hidden xl:block 2xl:block'>
      <ul className="flex gap-10">
        <HoverItem icon={<BsWrench />} itemTitle={"Serviços"} placement='bottom' tooltipItems={itemServicos} />
        <HoverItem icon={<GrWorkshop />} itemTitle={"Oficinas"} placement='bottom' tooltipItems={itemOficinas} />
        <HoverItem icon={<FaCar />} itemTitle={"Veículos"} placement='bottom' tooltipItems={itemVeiculos} />
        <HoverItem icon={<BiCalendar />} itemTitle={"Agendamentos"} placement='bottom' tooltipItems={itemAgendamentos} />
      </ul>
    </nav>
  )
}

export default BottomNav;