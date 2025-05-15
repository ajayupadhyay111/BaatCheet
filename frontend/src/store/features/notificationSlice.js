import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        unReadNotfication: 0,
        notifications: [],
    },
    reducers: {
        setNotificationCount: (state, action) => {
            state.unReadNotfication = action.payload;
        },
        setNotifications: (state, action) => {
            state.notifications = action.payload;
        },
    },
})

export const { setNotificationCount, setNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;