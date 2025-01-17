import { createSlice } from '@reduxjs/toolkit';

const changePasswordToastSlice = createSlice({
  name: 'changePasswordToast',
  initialState: {
    visibles: false,
    types: '',
    titles: '',
    textBodys: '',
  },
  reducers: {
    showToasts: (state, action) => {
      state.visibles = true;
      state.types = action.payload.types;
      state.titles = action.payload.titles;
      state.textBodys = action.payload.textBodys;
    },
    hideToasts: (state) => {
      state.visibles = false;
    },
  },
});

export const { showToasts, hideToasts } = changePasswordToastSlice.actions;
export default changePasswordToastSlice.reducer;
