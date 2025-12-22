import { useGetWishlistQuery } from '@/app/features/api/wishlistApiSlice'
import React from 'react'
import FavouriteCard from './FavouriteCard'

const FavouritesList = () => {
  const {data} = useGetWishlistQuery()
  return (
    <div className='h-full'>
      <h1 className='text-3xl font-semibold text-primary'>My Wishlist</h1>
      <div className=' h-full flex flex-col  md:grid md:grid-cols-3 lg:flex lg:flex-row lg:items-start lg:flex-wrap gap-3 2xl:gap-8 py-6 px-5 lg:px-0 md:mx-auto'>
        {data?.map((product) => (
            <FavouriteCard key={product.product_id} {...product.products} />
        ))}
      </div>
    </div>
  )
}

export default FavouritesList