import supabase from "@/app/supabaseClient";
import { apiSlice } from "./apiSlice";
import { toast } from "react-toastify";


const wishlistApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
       getWishlist: builder.query({
            async queryFn() {
                try {
                const { data, error } = await supabase
                    .from('wishlist')
                    .select('product_id, products(*)');
                    
                if (error) throw error;
                return { data };
                } catch (error) {
                return { error };
                }
            },
            providesTags: ['Wishlist'],
        }),

        addToWishlist: builder.mutation({
            async queryFn({product_id, user_id}) {
                try {

                const {data, error } = await supabase
                    .from('wishlist')
                    .insert([{ product_id, user_id }])
                    .select();
                    
                if (error) throw error
                return {data}
                } catch (error) {
                    console.log(error)
                    return { error };
                }
            },
            invalidatesTags: (result, error, { product_id }) => [
            { type: 'WishlistStatus', id: product_id },
            'Wishlist'
      ]
        }),

        checkInWishlist: builder.query({
            async queryFn({product_id}) {
                try { 

                const { data, error } = await supabase
                    .from('wishlist')
                    .select('product_id')
                    .eq('product_id', product_id);
                    
                if (error) throw error;
                return { data: data.length > 0 };
                } catch (error) {
                return { error };
                }
            },

        providesTags: (result, error, { product_id }) => [
        { type: 'WishlistStatus', id: product_id }
      ]
        }),

        removeFromWishlist: builder.mutation({
            async queryFn({product_id}) {
                try {
                
                const {data, error } = await supabase
                    .from('wishlist')
                    .delete()
                    .eq('product_id', product_id);  
                if (error) throw error;
                console.log(data)
                return {data};
                } catch (error) {
                    console.log(error)
                return { error };
                }
            },

            invalidatesTags: (result, error, { product_id }) => [
            { type: 'WishlistStatus', id: product_id },
            'Wishlist'
      ]
        }),


    })
})


export const {useAddToWishlistMutation, useCheckInWishlistQuery, useGetWishlistQuery, useRemoveFromWishlistMutation} = wishlistApiSlice