'use client'


import useDrawer from "@/hooks/usedrawer/usedrawer.hook";
import ToolTipItem from "@/types/tooltipitem/tooltipitem.type";
import { Drawer } from "@mui/material";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface SubMenuDrawerProps {
    icon: ReactElement
    itemTitle: string
    tooltipItems: Array<ToolTipItem>
}

const SubMenuDrawer = ({ icon, itemTitle, tooltipItems }: SubMenuDrawerProps) => {

    const { mainMenuOpen, changeMainMenuOpen } = useDrawer();
    const [subMenuOpen, setSubMenuOpen] = useState<boolean>(false);

    const changeSubMenuOpen = (subMenuOpen: boolean) => {
        setSubMenuOpen(!subMenuOpen);
    }

    useEffect(() => {
        if (mainMenuOpen == false) {
            changeSubMenuOpen(true);
        }
    }, [mainMenuOpen]);

    return (
        <li className="sm:block md:block lg:block xl:hidden 2xl:hidden">
            <li onClick={() => changeSubMenuOpen(subMenuOpen)}
                className="flex items-center gap-2 cursor-pointer text-neutral-400 hover:text-white group transition-all ease-in-out">
                {icon}
                {itemTitle}
                <BsChevronRight className='group-hover:ml-2 transition-all ease-in-out' />
            </li>
            <Drawer open={subMenuOpen} onClose={() => changeSubMenuOpen(true)}
                sx={{
                    zIndex: 2,
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: '100vw',
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        backdropFilter: 'blur(4px)',
                        marginTop: '5rem',
                        padding: '3rem'
                    },
                }}>
                <div className="flex flex-col text-white gap-4">
                    <section>
                        <button className="flex items-center gap-2 hover:gap-4 transition-all ease-in-out text-neutral-400 hover:text-white" onClick={() => changeSubMenuOpen(subMenuOpen)}><BsChevronLeft />Voltar</button>
                    </section>
                    <hr />
                    {tooltipItems.map(({ label, link, icon }) => (
                        <Link className="flex items-center gap-2 text-neutral-400 hover:text-white transition-all ease-in-out" onClick={async () => { changeSubMenuOpen(subMenuOpen); changeMainMenuOpen(true); }} href={link} key={label}>
                            {icon}
                            {label}
                        </Link>
                    ))}
                </div>
            </Drawer>
        </li>
    )
}

export default SubMenuDrawer