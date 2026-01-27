import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  role: null,
  firstName: null,
  lastName: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      state.user = action.payload.id
      state.role = action.payload.role
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
    },
    clearAuthState: (state) => {
      state.user = null;
      state.role = null;
      state.firstName = null;
      state.lastName = null;
    }
  }
});

export const { setAuthState, clearAuthState } = authSlice.actions;
export default authSlice.reducer;