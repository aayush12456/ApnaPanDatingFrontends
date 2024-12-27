import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    visible: false,
    type: '',
    title: '',
    textBody: '',
  },
  reducers: {
    showToast: (state, action) => {
      state.visible = true;
      state.type = action.payload.type;
      state.title = action.payload.title;
      state.textBody = action.payload.textBody;
    },
    hideToast: (state) => {
      state.visible = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
