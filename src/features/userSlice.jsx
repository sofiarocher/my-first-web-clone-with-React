import {  createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user:null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload; /* the user information is payload */
    },
    logout: (state) => {
      state.user = null; /* we dont need the user info so we make the user null again*/
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user; 

export default userSlice.reducer;
