import React, { useState } from 'react'
import { Button } from './ui/button';
import { MdAddToPhotos } from "react-icons/md";
import ShippingCard from './ShippingCard';
import Modal from './Modal';
import { useAddAddressMutation, useGetAddressQuery } from '@/app/features/api/shippingApiSlice';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const addShippingSchema = z.object({
  street:z.string().min(1,'Please input your street name'),
  city:z.string().min(1,'Please input your city'),
  state: z.string().min(1, "Please input your state"),
  country: z.string().min(1, 'Please add your country')
})

const formFields = ['street', 'city', "state", 'country']

const ShippingList = () => {
    const [openModal, setOpenModal] = useState()
    const {data:shippingData, isLoading:gettingAddress} = useGetAddressQuery();
    const [addAddress, {isLoading:addindAddress}] = useAddAddressMutation()
    const {id:user_id} = useSelector(state => state.persistedReducer.auth.user)

    const {register, handleSubmit,reset, formState:{errors,isSubmitting}} = useForm({
            resolver: zodResolver(addShippingSchema)
    })
    
    const onSubmit = async (formData) => {
        // console.log(formData)
        try {
                const shippingDetails = {
                user_id,
                street:formData.street,
                city:formData.city,
                state:formData.state,
                country:formData.country
            }

                // console.log("SHIPPING DETAILS: ", shippingDetails)
                const result = await addAddress(shippingDetails).unwrap()
                console.log(result)
                toast.success("Address Added Successfully", result)
                setOpenModal(false)
                reset()
                } catch (error) {
                    toast.error('Error adding address:', error)
                console.error('Error adding address:', error)
            }
        }

    
  return (
    <div className='w-full'>
        <div className='w-full flex flex-col lg:flex-row items-center justify-between gap-3'>
            <h1 className='text-3xl font-semibold text-primary'>Shipping Address</h1>
            {shippingData && shippingData.length < 4 ? (
                 <Button onClick={() => setOpenModal(true)} className='lg:w-max w-full h-[40px] px-6 flex items-center gap-3'>
                    <MdAddToPhotos />
                    Add Address
                </Button>
            ):(
                <Button className='lg:w-max w-full h-[40px] px-6 flex items-center gap-3'>
                   Address at Max
                </Button>
            )}
            
        </div>



        <div className='w-full h-full flex items-start gap-5 flex-wrap py-7'>

            {shippingData && shippingData.length > 0 ? shippingData.map(item => (
                <ShippingCard {...item}  key={item.id}/>
            )): (
                <div className='w-full h-[400px] flex items-center justify-center'>
                    <h1 className='text-2xl font-semibold'>No Addresses Found</h1>
                </div>
            )}

            

        </div>

        {openModal && 
        <Modal
            formSize={"md"}
            handleModal={setOpenModal}
            children={
                <form onSubmit={handleSubmit(onSubmit)} className='w-full h-max'>
                    <h1 className='mb-7 text-2xl text-primary'>Add New Address</h1>

                    
                    <div className='flex flex-col gap-1 w-full my-3'>
                            <label>Street Address</label>
                            <input {...register(`street`)} type='text' className='appearance-none w-full h-[50px] rounded-md border-[1px] border-black/40 px-5'/>
                            {errors.street && (<p className="mt-2 text-red-500 text-sm">{errors.street.message}</p>)}
                    </div>


                    <div className='lg:flex items-center gap-3 w-full'>
                        {formFields.slice(1).map(field => (
                            <div key={field} className='flex flex-col gap-1 w-full my-3'>
                                <label>{field}</label>
                                <input {...register(field)} type='text' className='appearance-none w-full h-[50px] rounded-md border-[1px] border-black/40 px-5'/>
                                {errors[field] && (<p className="mt-2 text-red-500 text-sm">{errors[field].message}</p>)}
                            </div>
                        ))}
                    </div>

                     <Button type='submit' className='w-full h-[50px] my-5 flex items-center justify-center'>
                        {addindAddress ? (<div className='loader'></div> ) : 'Add Address'}
                    </Button>
                </form>
            }
        />
        }
    </div>
  )
}

export default ShippingList