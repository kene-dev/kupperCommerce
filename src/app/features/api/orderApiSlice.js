import supabase from "@/app/supabaseClient";
import { apiSlice } from "./apiSlice";


const orderApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getMyOrders: builder.query({
            async queryFn(){
                try {
                  const {data, error} = await supabase.from('orders').select('*,users(*), shipping(*)')
                   if (error) throw error;
                   return {data}
                } catch (error) {
                     return { error };
                }
            },
            providesTags:['Orders']
        }),

        createOrder: builder.mutation({
        async queryFn({ user_id, shipping_address_id, cartItems, cartTotal, temp_address }) {
            try {
            // Create order
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .insert({
                user_id,
                shipping_address_id,
                total_amount: cartTotal,
                status: 'pending',
                temp_address: temp_address ? temp_address : null,
                order_data: cartItems
                })
                .select('id')
                .single();
            
            if (orderError) throw orderError;
            return {order}
            } catch (error) {
            return { error };
            }
        },
        invalidatesTags: ['Orders']
        })

    })
})


export const {useCreateOrderMutation, useGetMyOrdersQuery} = orderApiSlice