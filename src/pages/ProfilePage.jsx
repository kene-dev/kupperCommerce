import { useGetUserQuery } from '@/app/features/api/authApiSlice'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import account from "../assets/account.svg"
import { MdEmail } from "react-icons/md";
import OrdersList from '@/components/OrdersList';
import FavouritesList from '@/components/FavouritesList';
import ShippingList from '@/components/ShippingList';

const tabs = [
    'orders',
    'favourites',
    'shipping Address'
]

const ProfilePage = () => {
    // const userId = useSelector(state => state.persistedReducer.auth.user)
    const { data: user, isLoading } = useGetUserQuery();
    const [currentTab, setCurrentTab] = useState('orders')

    const renderView = () => {
        switch (currentTab) {
            case 'orders':
                return <OrdersList />
            case 'favourites':
                return <FavouritesList />
            case 'shipping Address':
                return <ShippingList />
            default:
                return <OrdersList />;
        }
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    console.log(user)



    return (
        <div className='w-screen 2xl:w-[80%] mx-auto min-h-screen lg:h-full flex lg:flex-row flex-col items-start gap-7 px-5 lg:px-10 my-5 '>
            <div className='w-full lg:max-w-[300px] h-[65%] bg-white drop-shadow-sm rounded-[10px] flex flex-col gap-7 items-start lg:px-5 2xl:px-10 py-10 px-5' >
                {user ? (
                    <div className='w-full flex flex-col items-center justify-center'>
                        <div className='w-[100px] h-[100px] rounded-full bg-primary text-white text-4xl font-bold flex items-center justify-center gap-1'>
                            <p>{user?.user_metadata?.first_name?.slice(0, 1)}</p>
                            <p>{user?.user_metadata?.last_name?.slice(0, 1)}</p>
                        </div>


                        <div className='flex items-center gap-2 text-3xl font-semibold'>
                            {/* <img src={account} alt="" /> */}
                            <h1>{user[0]?.firstName}</h1>
                            <h1>{user[0]?.lastName}</h1>
                        </div>

                        <div className='flex items-center gap-2'>
                            <MdEmail className='w-4 h-4 text-primary' />
                            <p>{user[0]?.email}</p>
                        </div>

                    </div>
                ) : (
                    <div> Fetching User info </div>
                )}


                {tabs?.map((tab, idx) => (
                    <div key={idx} onClick={() => setCurrentTab(tab)} className={`${tab === currentTab && '!bg-primary text-white font-semibold'} w-full bg-[#F2F2F5] h-[50px] hover:bg-primary capitalize hover:text-white rounded-lg text-center flex items-center justify-start  gap-5 shadow-sm px-9 cursor-pointer`}>
                        {tab}
                    </div>
                ))}
            </div>

            <div className='h-full w-full flex-grow overflow-y-scroll'>
                {renderView()}
            </div>
        </div>
    )
}

export default ProfilePage