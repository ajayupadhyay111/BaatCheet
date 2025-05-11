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
    setCoverImg(state, action) {
      state.userInfo.coverImg = action.payload;
    },
  },
});

export const { setUser, clearUser,setCoverImg } = userSlice.actions;
export default userSlice.reducer;
