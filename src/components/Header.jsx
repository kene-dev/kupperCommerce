import React, { useState } from 'react'
import call from '/src/assets/call.svg'
import { RiMenu3Line } from "react-icons/ri";
import logo from '../assets/koopLogo.png';
import SearchBar from './SearchBar';
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link, useLocation, useNavigate } from 'react-router'
import { navigationLinks, Navlanguages } from '@/lib/navLinks'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems } from '@/app/features/cartSlice'
import { clearCart } from '@/app/features/cartSlice'
import { clearAuthState } from '@/app/features/authSlice'
import { useSignOutUserMutation } from '@/app/features/api/authApiSlice'
import { MdShoppingCart } from "react-icons/md";


function Header() {
  const [openMenu, setOpenMenu] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const cartLength = useSelector(selectCartItems)
  const [signOutUser] = useSignOutUserMutation()

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  const handleLogout = async () => {
    try {
      // Sign out from Supabase
      await signOutUser().unwrap()

      // Clear auth state
      dispatch(clearAuthState())

      // Clear cart
      dispatch(clearCart())

      // Navigate to home page
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
      // Even if there's an error, clear local state and navigate
      dispatch(clearAuthState())
      dispatch(clearCart())
      navigate('/')
    }
  };

  return (
    <div className='w-screen font-poppins' >
      {/* first section - solid primary with secondary accent */}
      <div className='bg-primary/80 h-[45px] w-full flex justify-between items-center px-10 text-[13px]'>
        <div className='hidden lg:flex justify-center items-center gap-3 text-white'>
          <img src={call} alt="" />
          <p>CALL US:</p>
          <p>+234 806 011 9051</p>
        </div>
        <div className='flex justify-between items-center gap-8 text-white'>
          <p>NGN</p>

          {/* LANGUAGES DROPDOWN */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="px-2 py-1 text-white hover:bg-gradient-to-r hover:from-secondary/30 hover:to-secondary/10 hover:text-primary transition-all">
                {Navlanguages.find(l => l.value === i18n.language)?.label || 'Language'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[120px] shadow-lg">
              {Navlanguages.map((item, index) => (
                <div key={item.value}>
                  <DropdownMenuItem
                    onSelect={() => handleLanguageChange(item.value)}
                    className="cursor-pointer px-4 py-2 hover:bg-gradient-to-r hover:from-secondary/30 hover:to-secondary/10 transition-all"
                  >
                    <span className="text-sm font-medium text-black">{item.label}</span>
                  </DropdownMenuItem>
                  {index !== Navlanguages.length - 1 && <DropdownMenuSeparator />}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* PROFILE DROPDOWN */}
          {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="px-2 py-1 text-white hover:bg-gradient-to-r hover:from-secondary/30 hover:to-secondary/10 hover:text-primary transition-all flex items-center gap-2">
              <span className="sr-only">Account</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-5 h-5 text-white" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[160px] shadow-lg">
            <DropdownMenuItem
              asChild
              className="cursor-pointer px-4 py-2 hover:bg-gradient-to-r hover:from-secondary/30 hover:to-secondary/10 transition-all flex items-center gap-2"
            >
              <Link to="/profile" className="flex items-center gap-2">
              
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-4 h-4 text-primary" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A7.963 7.963 0 0112 15c1.88 0 3.627.653 5.036 1.747M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-medium text-black">{t('profile') || 'Profile'}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={handleLogout}
              className="cursor-pointer px-4 py-2 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-200/20 transition-all flex items-center gap-2"
            >
              
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
              </svg>
              <span className="text-sm font-medium text-red-500">{t('logout') || 'Logout'}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}


        </div>
      </div>

      {/* second section - solid light background with secondary accents */}
      <div className="bg-primary lg:h-[127px] h-[80px] w-full flex justify-between items-center lg:px-10  pr-5 border-b-2 border-primary/20">
        <div className="flex flex-col">
          <div className=" lg:px-4 py-2 ">
            <img src={logo} className="lg:w-36 w-24  object-contain" />
          </div>
          {/* <p className="lg:text-xs text-[10px] text-primary">{t('slogan')}</p> */}
        </div>

        <div className="w-[600px] hidden lg:flex items-center justify-center">
          <SearchBar isMobile={false} />
        </div>

        <div className="flex text-secondary gap-3">
          <div className="relative">
            <Link to="/cart">
              <MdShoppingCart className="lg:w-9 lg:h-9 w-7 h-7 text-white" />
            </Link>
            <p
              data-test="cart-length"
              className="absolute bg-gradient-to-br from-primary to-primary/90 text-white text-xs -top-3 lg:-right-2 -right-3 px-2 py-1 rounded-full border-2 border-secondary shadow-md"
            >
              {cartLength.length}
            </p>
          </div>
          <div className="hidden lg:flex flex-col text-sm">
            <Link to="/cart" className="text-secondary font-medium">{t('cart')}</Link>
            <p className="text-sm text-secondary/80">₦0.00 NGN</p>
          </div>
        </div>

      </div>

      {/* third section - solid primary with secondary button */}

      <div className='w-full bg-secondary h-[51px] lg:px-10 px-5 flex items-center lg:justify-normal justify-between lg:gap-30 relative overflow-hidden'>

        <div className='bg-gradient-to-r from-primary to-primary/90 w-[300px] hidden lg:flex items-center justify-center font-semibold text-lg h-full text-white shadow-lg relative z-10'>
          ALL DEPARTMENTS
        </div>

        <div className='w-2/3 lg:hidden flex items-center justify-start relative z-10'>
          <SearchBar isMobile={true} />
        </div>

        <RiMenu3Line onClick={() => setOpenMenu(!openMenu)} className='w-7 h-7 text-primary lg:hidden relative z-10 hover:text-secondary transition-colors' />

        <nav className='hidden lg:flex relative z-10'>
          <ul className='flex gap-16 text-[16px] text-white items-center justify-center font-normal'>
            {navigationLinks.map(link => (
              <Link key={link.path} to={link.path}>
                <li className={`uppercase transition-colors hover:text-secondary ${location.pathname === link.path ? 'text-primary font-bold' : 'text-primary/70'}`}>{t(`${link.name}`)}</li>
              </Link>
            ))}
          </ul>
        </nav>
      </div>

      <Sheet open={openMenu} onOpenChange={setOpenMenu} >
        <SheetContent side='left'>
          <ul className='w-full flex flex-col gap-6 text-[16px] text-black items-start justify-start px-5 py-5'>
            {navigationLinks.map(link => (
              <Link className='w-full' onClick={() => setOpenMenu(false)} key={link.path} to={link.path}>
                <li className={`uppercase ${location.pathname === link.path ? 'text-primary font-bold w-full' : 'text-black w-full'}`}>{link.name}</li>
              </Link>
            ))}
          </ul>
        </SheetContent>
      </Sheet>

    </div>
  )
}

export default Header