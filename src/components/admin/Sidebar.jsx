import React from 'react'
import logo from '../../assets/koopLogo.png';
import { adminNavLinks } from '@/lib/navLinks';
import { Link, useLocation } from 'react-router';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { useSignOutUserMutation } from '@/app/features/api/authApiSlice';
import { clearAuthState } from '@/app/features/authSlice';
import { clearCart } from '@/app/features/cartSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { BiLogOut } from "react-icons/bi";

const Sidebar = ({ isOpen, onClose }) => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [signOut] = useSignOutUserMutation()

    const handleLinkClick = () => {
        // Close sidebar on mobile when a link is clicked
        if (onClose) {
            onClose();
        }
    };

    const handleLogout = async () => {
        try {
            // Sign out from Supabase
            await signOut().unwrap()

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
        <>
            {/* Overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <div className={`
                fixed lg:relative top-0 left-0 z-50 
                w-[280px] lg:w-[356px] h-screen 
                bg-primary drop-shadow-lg rounded-r-[10px] lg:rounded-[10px] 
                flex flex-col gap-10 items-start px-5 2xl:px-10
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Close button for mobile */}
                <button
                    onClick={onClose}
                    className='absolute top-4 right-4 lg:hidden text-white hover:text-secondary transition-colors'
                    aria-label="Close sidebar"
                >
                    <X size={24} />
                </button>

                <Link to='/' onClick={handleLinkClick}>
                    <img src={logo} className='w-[140px] lg:w-[170px] my-3' alt="Logo" />
                </Link>

                <hr className='bg-secondary h-[1px] w-full -mt-4' />
                <div className='w-full overflow-y-auto flex-1 pb-6'>
                    {adminNavLinks.map(link => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={handleLinkClick}
                            className={`${pathname === link.path ? 'bg-secondary text-primary font-bold' : 'text-white hover:bg-secondary hover:text-primary'} w-full h-[55px] lg:h-[61px] my-3 lg:my-4 rounded-lg text-center flex items-center justify-start gap-4 lg:gap-5 shadow-lg px-6 lg:px-10 text-sm lg:text-base transition-colors duration-200`}
                        >
                            {<link.icon size={20} />}
                            {link.name}
                        </Link>
                    ))}

                    <Button onClick={handleLogout} className={`text-white hover:bg-secondary hover:text-primary w-full h-[55px] lg:h-[61px] my-3 lg:my-4 rounded-lg text-center flex items-center justify-start gap-4 lg:gap-5 shadow-lg px-6 lg:px-10 text-sm lg:text-base transition-colors duration-200`} >
                        <BiLogOut size={20} />
                        <p>Logout</p>
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Sidebar