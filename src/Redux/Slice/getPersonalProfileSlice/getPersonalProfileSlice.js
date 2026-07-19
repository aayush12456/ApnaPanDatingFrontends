import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios/axios'
// Async thunk to update a Todo item
export const getPersonalProfileAsync = createAsyncThunk(
  'User/ getPersonalProfileAsync',
  async (userId, { rejectWithValue }) => {

    try {
      const response = await axios.get(`/personalDetails/${userId}`); 
      // console.log('get peersonal  user',response.data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Redux slice for managing Todo datafggfhg
const getPersonalProfileSlice = createSlice({
  name: 'getPersonalProfile',
  initialState: {
    getPersonalProfileObj: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPersonalProfileAsync.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getPersonalProfileAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.updatePersonalData = action.payload;
    });
    builder.addCase(getPersonalProfileAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default getPersonalProfileSlice.reducer;
export const getPersonalProfileSliceActions = getPersonalProfileSlice.actions;