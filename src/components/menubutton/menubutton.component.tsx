'use client'

import { Drawer, Link } from "@mui/material"
import { BiCalendar } from "react-icons/bi"
import { BsWrench } from "react-icons/bs"
import { FaCar } from "react-icons/fa"
import { GrWorkshop } from "react-icons/gr"
import { IoIosMenu } from "react-icons/io"
import { IoCloseOutline } from "react-icons/io5"
import SubMenuDrawer from "../submenudrawer/submenudrawer.component"
import useDrawer from "@/hooks/usedrawer/usedrawer.hook"

const MenuButton = () => {
    const itemVeiculos = [{ label: 'Meus Veículos', link: '/Veiculo', icon: <FaCar /> }]
    const itemServicos = [{ label: 'Serviços Gratuitos Para Segurados', link: '/Servicos/gratisParaSegurado=true', icon: <BsWrench /> }, { label: 'Todos os Serviços', link: '/Servicos', icon: <BsWrench /> }]
    const itemOficinas = [{ label: 'Oficinas Porto', link: '/Oficinas/oficinaPorto=true', icon: <GrWorkshop /> }, { label: 'Todas Oficinas', link: '/Oficinas', icon: <GrWorkshop /> }]
    const itemAgendamentos = [{ label: 'Todos Agendamentos', link: '/Agendamentos', icon: <BiCalendar /> }]

    const { mainMenuOpen, changeMainMenuOpen } = useDrawer();

    return (
        <div>
            <button className='flex items-center h-full sm:flex md:flex lg:flex xl:hidden 2xl:hidden"' onClick={() => changeMainMenuOpen(mainMenuOpen)}>{mainMenuOpen ? <IoCloseOutline size={"1.7rem"} /> : <IoIosMenu size={"1.7rem"} />}</button>
            <Drawer open={mainMenuOpen}
                onClose={() => changeMainMenuOpen(mainMenuOpen)}
                sx={{
                    zIndex: 1,
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: '100vw',
                        background: `${mainMenuOpen ? 'linear-gradient(to right bottom, rgba(0,0,0,1) 1%, rgba(106,0,255,0.38) 5%, rgba(0,0,0,0.9) 18%)' : 'rgba(0,0,0,0.8)'}`,
                        backdropFilter: 'blur(4px)',
                        marginTop: '4.9rem',
                        padding: '3rem',
                    },
                }}
                className="block sm:block md:block lg:block xl:hidden 2xl:hidden"
            >
                <div className="text-white flex flex-col gap-8">
                    <section className='flex list-none gap-8'>
                        <li onClick={() => changeMainMenuOpen(true)} className="px-4 py-2 bg-neutral-950 rounded-md border border-neutral-800 hover:border-neutral-100 hover:bg-[rgba(0,0,0,0.7)] hover:backdrop-blur-sm transition-all ease-in-out group">
                            <Link href={'/Sobre'} className="text-neutral-400 group-hover:text-white no-underline">
                                Sobre nós
                            </Link>
                        </li>
                        <li onClick={() => changeMainMenuOpen(true)} className="px-4 py-2 bg-neutral-950 rounded-md border border-neutral-800 hover:border-neutral-100 hover:bg-[rgba(0,0,0,0.7)] hover:backdrop-blur-sm transition-all ease-in-out group">
                            <Link href={'/SobreProjeto'} className="text-neutral-400 group-hover:text-white no-underline">
                                Sobre Projeto
                            </Link>
                        </li>
                        <li onClick={() => changeMainMenuOpen(true)} className="px-4 py-2 bg-neutral-950 rounded-md border border-neutral-800 hover:border-neutral-100 hover:bg-[rgba(0,0,0,0.7)] hover:backdrop-blur-sm transition-all ease-in-out group">
                            <Link href={'/Contato'} className="text-neutral-400 group-hover:text-white no-underline">
                                Contato
                            </Link>
                        </li>

                    </section>
                    <section className='flex flex-col list-none gap-8'>
                        <SubMenuDrawer icon={<BsWrench />} itemTitle={'Serviços'} tooltipItems={itemServicos} />
                        <SubMenuDrawer icon={<GrWorkshop />} itemTitle={'Oficinas'} tooltipItems={itemOficinas} />
                        <SubMenuDrawer icon={<FaCar />} itemTitle={'Veículos'} tooltipItems={itemVeiculos} />
                        <SubMenuDrawer icon={<BiCalendar />} itemTitle={'Agendamentos'} tooltipItems={itemAgendamentos} />
                    </section>
                </div>
            </Drawer >
        </div >
    )
}

export default MenuButton