import React, { useState } from 'react'
import { GoTrash } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import { BiSolidEditAlt } from "react-icons/bi";
import Modal from './Modal';
import { Button } from './ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRemoveAddressMutation, useUpdateAddressMutation } from '@/app/features/api/shippingApiSlice';
import { toast } from 'react-toastify';

const editShippingSchema = z.object({
  street:z.string().min(1,'Please input your street name'),
  city:z.string().min(1,'Please input your city'),
  state: z.string().min(1, "Please input your state"),
  country: z.string().min(1, 'Please add your country')
})

const formFields = ['street', 'city', "state", 'country']

const ShippingCard = ({id, street, city, state, country}) => {
  const [openModal, setOpenModal] = useState()
  const [updateAddress, {isLoading:updatingAddress}] = useUpdateAddressMutation();
  const [removeAddress, {isLoading:removingAddress}] = useRemoveAddressMutation();
   const {register, handleSubmit,reset, formState:{errors,dirtyFields}} = useForm({
              resolver: zodResolver(editShippingSchema),
              defaultValues:{
                street:street,
                city:city,
                state:state,
                country:country
              }
    })

    const onSubmit = async (formData) => {
        const hasDirtyFields = dirtyFields && Object.keys(dirtyFields).length > 0;

        if (!hasDirtyFields) {
            setOpenModal(false);
            return;
        }
        const updateData = Object.keys(dirtyFields).reduce((acc, field) => {
            if (dirtyFields[field]) {
            acc[field] = formData[field];
            }
            return acc;
        }, {});
        console.log(updateData)
    
        try {
            const result = await updateAddress({updateData, id}).unwrap()
            toast.success("Address updated Successfully", result)
            setOpenModal(false)
            reset()
        } catch (error) {
            toast.error('Error updating address:', error)
            console.error('Error updating address:', error)
      }
    }

    const handleRemoveAddress = async () => {
        try {
            await removeAddress({id}).unwrap();
            toast.success('Address Removed Successfully');
        } catch (error) {
            toast.error("Address Removal failed. Please try again.");
        }             
    }
  return (
    <>
        <div className='lg:w-[350px] w-full h-[120px] flex flex-col items-start justify-center bg-white border-[1px] border-black/30 drop-shadow-md rounded-md p-4 relative'>
            <h2 className='text-black/70 w-3/4 capitalize'>{street},</h2>
            <div className='w-3/4 flex flex-wrap text-sm items-center gap-x-2 text-black/50'>
                <h2>{city},</h2>
                <h2>{state},</h2>
                <h2>{country}.</h2>
            </div>

            <div className='absolute right-5 top-3 flex items-center gap-3'>
                <BiSolidEditAlt onClick={() => setOpenModal(true)} className='w-5 h-5 cursor-pointer' />
                <GoTrash onClick={handleRemoveAddress} className='text-primary w-5 h-5 cursor-pointer' />
            </div>
        </div>

      {openModal && 
        <Modal
            formSize={"md"}
            handleModal={setOpenModal}
            children={
                <form onSubmit={handleSubmit(onSubmit)} className='w-full h-max'>
                    <h1 className='mb-7 text-2xl text-primary'>Edit Address</h1>

                    
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
                        {updatingAddress ? (<div className='loader'></div> ) : 'Edit Address'}
                    </Button>
                </form>
            }
        />
        }

        
    </>
  )
}

export default ShippingCard