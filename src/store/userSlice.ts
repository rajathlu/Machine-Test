"use client"

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the user state
interface UserState {
  user: { // Define the shape of the user object
    id?: string;
    name?: string;
    email?: string;
    // Add other user-related fields here
  } | null;
}

// Define the initial state with the UserState type
const initialState: UserState = {
  user: null,
};

// Create the slice with type annotations
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<UserState['user']>) => {
      state.user = action.payload;
    },
  },
});

// Export the action creators
export const { setUserDetails } = userSlice.actions;

// Export the reducer as default
export default userSlice.reducer;
