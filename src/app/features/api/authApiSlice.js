import supabase from "@/app/supabaseClient";
import { apiSlice } from "./apiSlice";


const authAPiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signUpUser: builder.mutation({
            async queryFn({ id, email, role, firstName, lastName }) {
                try {
                    const { data, error } = await supabase
                        .from('users')
                        .insert([{
                            id,
                            email,
                            role,
                            firstName,
                            lastName
                        }])
                        .select();

                    if (error) {
                        return { error: { status: error.status || 'CUSTOM_ERROR', data: error.message } };
                    }
                    return { data };

                } catch (error) {
                    return { error: { status: 500, data: error.message } };
                }
            },
            invalidatesTags: ['User']
        }),


        signInUser: builder.mutation({
            async queryFn(formData) {
                try {
                    const { data, error } = await supabase.auth.signInWithPassword(formData);
                    if (error) {
                        return { error: { status: error.status || 'FETCH_ERROR', data: error.message } };
                    }
                    return { data };
                } catch (error) {
                    return { error: { status: 500, data: error.message } };
                }
            },
            invalidatesTags: ['User']
        }),

        getUser: builder.query({
            async queryFn() {
                try {
                    const { data: { user }, error } = await supabase.auth.getUser()

                    if (error) {
                        return { error: { status: error.status || 'FETCH_ERROR', data: error.message } };
                    }
                    return { data: user };
                } catch (error) {
                    return { error: { status: 500, data: error.message } };
                }
            },
            providesTags: ['User']
        }),


        signOutUser: builder.mutation({
            async queryFn() {
                try {
                    const { error } = await supabase.auth.signOut();
                    if (error) {
                        return { error: { status: error.status || 'FETCH_ERROR', data: error.message } };
                    }
                    return { data: { message: 'Sign out successful' } };
                } catch (error) {
                    return { error: { status: 500, data: error.message } };
                }
            },
            invalidatesTags: ['User']
        }),

        forgotPassword: builder.mutation({
            async queryFn({ email }) {
                try {
                    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
                        redirectTo: 'http://localhost:5173/auth/reset-password',
                    });
                    if (error) {
                        return { error: { status: error.status, data: error.message } };
                    }
                    console.log(data)
                    return { data };
                } catch (error) {
                    return { error: { status: error.status || 500, data: error.message } };
                }
            }
        }),

        resetPassword: builder.mutation({
            async queryFn({ password }) {
                try {
                    const { data, error } = await supabase.auth.updateUser({
                        password
                    });
                    if (error) {
                        return { error: { status: error.status, data: error.message } };
                    }
                    return { data };
                } catch (error) {
                    return { error: { status: error.status || 500, data: error.message } };
                }
            }
        })


    })
})
export const { useSignInUserMutation, useSignUpUserMutation, useSignOutUserMutation, useGetUserQuery, useForgotPasswordMutation, useResetPasswordMutation } = authAPiSlice;