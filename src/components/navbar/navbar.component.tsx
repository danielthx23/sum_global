import BottomNav from "../bottomnav/bottomnav.component"
import TopNav from "../topnav/topnav.component"

const Nav = () => {
  return (
    <header className='sticky top-0 w-screen
      bg-gradient-to-r from-backgroundopacity80 from-3% via-gradientcolor via-10% to-backgroundopacity80  to-35%
      backdrop-blur-sm z-10'>
      <TopNav />
      <BottomNav />
    </header>
  )
}

export default Nav