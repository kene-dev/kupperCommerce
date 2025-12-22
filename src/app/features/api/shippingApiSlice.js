import supabase from "@/app/supabaseClient";
import { apiSlice } from "./apiSlice";
import { toast } from "react-toastify";


const shippingApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
       getAddress: builder.query({
            async queryFn() {
                try {
                const { data, error } = await supabase
                    .from('shipping')
                    .select('*');
                    
                if (error) throw error;
                return { data };
                } catch (error) {
                return { error };
                }
            },
            providesTags: ['Shipping'],
        }),

        addAddress: builder.mutation({
            async queryFn({street, city, state, country, user_id}) {
                try {

                const {data, error } = await supabase
                    .from('shipping')
                    .insert([{ street, city, state, country, user_id }])
                    .select();
                    
                if (error) throw error
                if(data){
                    console.log('ADD ADDRESS SUCCESS:', data[0]?.id)
                }
                return {data}
                } catch (error) {
                    console.log(error)
                    return { error };
                }
            },
            invalidatesTags:['Shipping']
        }),

        updateAddress: builder.mutation({
            async queryFn({updateData, id}) {
                try { 

                const { data, error } = await supabase
                .from('shipping')
                .update(updateData)
                .eq('id', id)
                .select()
                    
                if (error) throw error
                return {data}
                } catch (error) {
                    console.log(error)
                    return { error };
                }
            },

        invalidatesTags:['Shipping']
        }),

        removeAddress: builder.mutation({
            async queryFn({id}) {
                try {
                
                const {data, error } = await supabase
                    .from('shipping')
                    .delete()
                    .eq('id', id);  
                if (error) throw error;
                console.log(data)
                return {data};
                } catch (error) {
                    console.log(error)
                return { error };
                }
            },

            invalidatesTags:['Shipping']
        }),


    })
})


export const {useAddAddressMutation, useUpdateAddressMutation,useGetAddressQuery, useRemoveAddressMutation } = shippingApiSlice