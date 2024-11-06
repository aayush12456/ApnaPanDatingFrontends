import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios/axios'
// Async thunk to update a Todo item
export const updatePersonalDataAsync = createAsyncThunk(
  'user/updateuserAsync',
  async (updatePersonalDataObj, { rejectWithValue }) => {
    // console.log('obj is',updateUserObj)
    try {
      const response = await axios.post(`/updateUser/${updatePersonalDataObj.id}`, updatePersonalDataObj);
      // console.log('update user is',response.data.updateData)
      const updateUser=response.data.updateData
      console.log('update personal data in interest',updateUser?.interest)
      return response.data; // Assuming the response contains updated data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Redux slice for managing Todo datafggfhg
const updatePersonalDataSlice = createSlice({
  name: 'userTodo',
  initialState: {
    updatePersonalData: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updatePersonalDataAsync.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updatePersonalDataAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.updatePersonalData = action.payload;
    });
    builder.addCase(updatePersonalDataAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default updatePersonalDataSlice.reducer;
export const updatePersonalDataSliceActions = updatePersonalDataSlice.actions;