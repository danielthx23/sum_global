import Link from 'next/link'
import logoSumLight from '../../../public/logos/sum_logo.svg'
import logoSumDark from '../../../public/logos/sumdark_logo.svg'
import logoWWT from '../../../public/logos/worldwide_blue.svg'
import MenuButton from '../menubutton/menubutton.component'
import LinkRedirect from '../linkredirect/linkredirect.component'
import UnoptimizedImage from '@/utils/unoptimizedimage/unoptimizedimage.util'

const TopNav = () => {
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
            <li><LinkRedirect title="Sobre nós" link={'/Sobre'} /></li>
            <li><LinkRedirect title="Sobre Projeto" link={'/SobreProjeto'} /></li>
            <li><LinkRedirect title="Contato" link={'/Contato'} /></li>
          </section>
        </section>
        <section className='flex gap-3'>
          <input type="text" placeholder='Pesquisar páginas por...' className='rounded-lg px-4 w-60 bg-backgroundlight placeholder-neutral-400 outline-none hover:bg-foregroundlight hover:text-background transition-all ease-in-out' />
          <Link href={"/login"} className='px-4 py-2 rounded-lg bg-backgroundlight text-foreground hover:text-white font-bold border border-neutral-700 hover:bg-foregroundlight transition-all ease-in-out'>Feedback</Link>
          <Link href={"/login"} className='px-5 py-2 rounded-lg bg-foreground text-backgroundlight font-bold hover:bg-backgroundlight hover:text-foregroundlight transition-all ease-in-out'>Log In</Link>
        </section>
      </ul>
    </nav>
  )
}

export default TopNav;