'use client'

import Link from 'next/link'
import logoSumLight from '../../../public/logos/sum_logo.svg'
import logoSumDark from '../../../public/logos/sumdark_logo.svg'
import logoWWT from '../../../public/logos/worldwide_blue.svg'
import MenuButton from '../menubutton/menubutton.component'
import LinkRedirect from '../linkredirect/linkredirect.component'
import UnoptimizedImage from '@/utils/unoptimizedimage/unoptimizedimage.util'
import SearchBarPages from '../searchbarpages/searchbarpages.components'
import { FaCertificate, FaChargingStation } from 'react-icons/fa'
import { IoPerson } from 'react-icons/io5'
import { MdForum } from 'react-icons/md'
import useAuth from '@/hooks/useauth/useauth.hook'
import Page from '@/types/page/page.type'
import ProfileToolTipItem from '../profiletooltip/profiletooltip.component'

const TopNav = () => {
  const { usuario } = useAuth();

  return (
    <nav className='w-full border-b border-foregroundopacity20 px-[5%] py-4'>
      <ul className='w-full flex justify-between items-center text-sm'>
        <section className='flex items-center gap-14'>
          <li className='sm:block md:block lg:block xl:hidden 2xl:hidden'>
            <MenuButton />
          </li>
          <li>
            <Link href={'/'} className='flex gap-4 items-center separate'>
              <UnoptimizedImage src={logoWWT} alt="Logo da WWT" className='w-16 h-fit' />
              <span className='border border-opacity-15 border-foreground mx-2 rotate-[30deg] h-8 w-[2px]'></span>
              <UnoptimizedImage src={logoSumLight} alt="Logo da Sum+" className='w-24 h-fit block dark:hidden' />
              <UnoptimizedImage src={logoSumDark} alt="Logo da Sum+" className='w-24 h-fit hidden dark:block' />
            </Link>
          </li>

          <section className='gap-8 hidden sm:hidden md:hidden lg:hidden xl:flex 2xl:flex'>
            <li><LinkRedirect title="Sobre nós" link={'/sobre/empresa'} /></li>
            <li><LinkRedirect title="Sobre Projeto" link={'/sobre/projeto'} /></li>
            <li><LinkRedirect title="Contato" link={'/contato'} /></li>
          </section>
        </section>
        <section className='flex gap-3'>
          <SearchBarPages
            pages={[
              {
                label: "Sobre",
                link: "/sobre/empresa",
                icon: <IoPerson />,
              },
              {
                label: "Sobre Projeto",
                link: "/sobre/projeto",
                icon: <FaChargingStation />,
              },
              {
                label: "Contato",
                link: "/contato",
                icon: <MdForum />,
              },
              {
                label: "Fornecimentos",
                link: "/fornecimentos",
                icon: <FaChargingStation />,
                subPages: [
                  usuario?.valorToken && {
                    label: "Meus Fornecimentos",
                    link: `/fornecimentos/usuario/${usuario.idUsuario}`,
                    icon: <IoPerson />,
                  },
                  {
                    label: "Todos Fornecimentos",
                    link: "/fornecimentos",
                    icon: <FaChargingStation />,
                  },
                ].filter(Boolean) as Page[], 
              },
              {
                label: "Posts",
                link: "/posts",
                icon: <MdForum />,
                subPages: [
                  usuario?.valorToken && { label: "Meus Posts", link: "/posts/meus", icon: <IoPerson /> },
                  { label: "Todos Posts", link: "/posts", icon: <MdForum /> },
                ].filter(Boolean) as Page[], 
              },
              usuario?.valorToken && usuario?.tipoConta === 'consumidor'
                ? {
                  label: "Certificados",
                  link: "/certificados",
                  icon: <FaCertificate />,
                  subPages: [
                    usuario?.valorToken && {
                      label: "Meus Certificados",
                      link: "/certificados/meus",
                      icon: <IoPerson />,
                    },
                  ].filter(Boolean) as Page[], 
                }
                : null,
            ]
              .filter(Boolean) 
              .map((page) => page as Page)} 
          />

          <Link href={"/feedback"} className='px-4 py-2 rounded-lg bg-backgroundlight text-foreground hover:text-white font-bold border border-neutral-700 hover:bg-foregroundlight transition-all ease-in-out'>Feedback</Link>
          {usuario?.valorToken ?
            <ProfileToolTipItem />
            :
            <Link href={"/login"} className='px-5 py-2 rounded-lg bg-foreground text-backgroundlight font-bold hover:bg-backgroundlight hover:text-foregroundlight transition-all ease-in-out'>Log In</Link>}
        </section>
      </ul>
    </nav>
  )
}

export default TopNav;