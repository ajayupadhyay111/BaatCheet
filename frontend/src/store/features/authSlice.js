import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  isUser: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.userInfo = action.payload;
      state.isUser = true;
    },
    clearUser(state) {
      state.userInfo = null;
      state.isUser = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
