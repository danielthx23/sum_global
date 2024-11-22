'use client';

import useDrawer from "@/hooks/usedrawer/usedrawer.hook";
import ToolTipItem from "@/types/tooltipitem/tooltipitem.type";
import { Drawer } from "@mui/material";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface SubMenuDrawerProps {
    icon: ReactElement;
    itemTitle: string;
    tooltipItems: Array<ToolTipItem>;
}

const SubMenuDrawer = ({ icon, itemTitle, tooltipItems }: SubMenuDrawerProps) => {
    const { mainMenuOpen, changeMainMenuOpen } = useDrawer();
    const [subMenuOpen, setSubMenuOpen] = useState<boolean>(false);

    const changeSubMenuOpen = () => {
        setSubMenuOpen(!subMenuOpen);
    };

    useEffect(() => {
        if (!mainMenuOpen) {
            setSubMenuOpen(false);
        }
    }, [mainMenuOpen]);

    return (
        <div className="sm:block md:block lg:block xl:hidden 2xl:hidden">
            <div onClick={changeSubMenuOpen}
                className="flex items-center gap-2 cursor-pointer text-foregroundopacity80 hover:text-foreground group transition-all ease-in-out">
                {icon}
                {itemTitle}
                <BsChevronRight className='group-hover:ml-2 transition-all ease-in-out' />
            </div>
            <Drawer open={subMenuOpen} onClose={changeSubMenuOpen}
                sx={{
                    zIndex: 2,
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: '100vw',
                        backgroundColor: 'var(--background)',
                        backdropFilter: 'blur(4px)',
                        marginTop: '4.6rem',
                        padding: '3rem'
                    },
                }}
                slotProps={{
                    backdrop: {
                        sx: {
                            backgroundColor: 'var(--backgroundopacity80)',
                            backgro8ndOpacity: '20%', 
                        },
                    },
                }}>
                <div className="flex flex-col text-white gap-4">
                    <section>
                        <button className="flex items-center gap-2 hover:gap-4 transition-all ease-in-out text-foreground hover:text-foreground" onClick={changeSubMenuOpen}>
                            <BsChevronLeft className="text-foreground" />Voltar
                        </button>
                    </section>
                    <hr />
                    <ul className="flex flex-col">
                        {tooltipItems.map(({ label, link, icon }) => (
                            <li key={label}>
                                <Link className="flex items-center gap-2 text-foregroundopacity80 hover:text-foreground transition-all ease-in-out" onClick={async () => { changeSubMenuOpen(); changeMainMenuOpen(true); }} href={link}>
                                    {icon}
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </Drawer>
        </div>
    );
}

export default SubMenuDrawer;