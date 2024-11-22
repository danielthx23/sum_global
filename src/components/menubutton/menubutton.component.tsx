"use client";

import { Drawer, Link } from "@mui/material";
import { BsWrench } from "react-icons/bs";
import { FaCar, FaChargingStation } from "react-icons/fa";
import { GrWorkshop } from "react-icons/gr";
import { IoIosMenu } from "react-icons/io";
import { IoCloseOutline, IoPerson } from "react-icons/io5";
import SubMenuDrawer from "../submenudrawer/submenudrawer.component";
import useDrawer from "@/hooks/usedrawer/usedrawer.hook";
import useAuth from "@/hooks/useauth/useauth.hook";
import { MdForum } from "react-icons/md";
import ToolTipItem from "@/types/tooltipitem/tooltipitem.type";

const MenuButton = () => {
  const { usuario } = useAuth();

  const itemFornecedores: ToolTipItem[] = [
    usuario?.valorToken
      ? {
          label: "Meus fornecimentos",
          link: "/fornecimentos/usuario",
          icon: <IoPerson />,
        }
      : null,
    {
      label: "Todos fornecimentos",
      link: "/fornecimentos",
      icon: <FaChargingStation />,
    },
  ].filter(Boolean) as ToolTipItem[];

  const itemForum: ToolTipItem[] = [
    usuario?.valorToken
      ? {
          label: "Meus Posts",
          link: "/posts/usuario",
          icon: <IoPerson />,
        }
      : null,
    {
      label: "Todos Posts",
      link: "/posts",
      icon: <MdForum />,
    },
  ].filter(Boolean) as ToolTipItem[];

  const itemCertificados: ToolTipItem[] = [
    usuario?.valorToken
      ? {
          label: "Meus certificados",
          link: "/certificados/usuario",
          icon: <IoPerson />,
        }
      : null,
  ].filter(Boolean) as ToolTipItem[];

  const { mainMenuOpen, changeMainMenuOpen } = useDrawer();

  return (
    <div>
      <button
        className='flex items-center h-full sm:flex md:flex lg:flex xl:hidden 2xl:hidden"'
        onClick={() => changeMainMenuOpen(mainMenuOpen)}
      >
        {mainMenuOpen ? (
          <IoCloseOutline size={"1.7rem"} />
        ) : (
          <IoIosMenu size={"1.7rem"} />
        )}
      </button>
      <Drawer
        open={mainMenuOpen}
        onClose={() => changeMainMenuOpen(mainMenuOpen)}
        sx={{
          zIndex: 1,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "100vw",
            background: `${
              mainMenuOpen
                ? "linear-gradient(to right bottom, var(--background) 1%, var(--gradientcolor) 5%, var(--background) 18%)"
                : "var(--background)"
            }`,
            backdropFilter: "blur(4px)",
            marginTop: "4.7rem",
            padding: "3rem",
          },
        }}
        slotProps={{
            backdrop: {
                sx: {
                    backgroundColor: 'var(--backgroundopacity80)',
                    backgro8ndOpacity: '20%', 
                },
            },
        }}
        className="block sm:block md:block lg:block xl:hidden 2xl:hidden"
      >
        <div className="text-foreground flex flex-col gap-8">
          <ul className="flex list-none gap-8">
            <li
              onClick={() => changeMainMenuOpen(true)}
              className="px-4 py-2 bg-backgroundlight rounded-md border border-background hover:border-foreground hover:bg-background hover:backdrop-blur-sm transition-all ease-in-out group"
            >
              <Link
                href={"/sobre/empresa"}
                className="text-background group-hover:text-foreground"
              >
                Sobre nós
              </Link>
            </li>
            <li
              onClick={() => changeMainMenuOpen(true)}
              className="px-4 py-2 bg-backgroundlight rounded-md border border-background hover:border-foreground hover:bg-background hover:backdrop-blur-sm transition-all ease-in-out group"
            >
              <Link
                href={"/sobre/projeto"}
                className="text-background group-hover:text-foreground"
              >
                Sobre Projeto
              </Link>
            </li>
            <li
              onClick={() => changeMainMenuOpen(true)}
              className="px-4 py-2 bg-backgroundlight rounded-md border border-background hover:border-foreground hover:bg-background hover:backdrop-blur-sm transition-all ease-in-out group"
            >
              <Link
                href={"/contato"}
                className="text-foreground group-hover:text-foreground"
              >
                Contato
              </Link>
            </li>
          </ul>
          <ul className="flex flex-col list-none gap-8 text-foreground">
            <SubMenuDrawer
              icon={<BsWrench />}
              itemTitle={"Fornecimentos"}
              tooltipItems={itemFornecedores}
            />
            <SubMenuDrawer
              icon={<GrWorkshop />}
              itemTitle={"Forum"}
              tooltipItems={itemForum}
            />
            {usuario?.valorToken && (
              <SubMenuDrawer
                icon={<FaCar />}
                itemTitle={"Certificados"}
                tooltipItems={itemCertificados}
              />
            )}
          </ul>
        </div>
      </Drawer>
    </div>
  );
};

export default MenuButton;
