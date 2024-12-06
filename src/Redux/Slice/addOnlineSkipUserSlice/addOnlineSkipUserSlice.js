import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const addOnlineSkipUserAsync = createAsyncThunk(
  'User/addOnlineSkipUserAsync',
  async (addOnlineSkipUser, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/addOnlineSkipUser/${addOnlineSkipUser.id}`, addOnlineSkipUser, {
        headers: { 'Content-Type': 'application/json', }
      });
   
      if (!response.status === 200) {
        throw new Error('Failed to add movie data to mongodb database.');
      }
     
      const Responedata = response.data;
      // console.log('add online skip user data is',Responedata)
  
      return Responedata;
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const addOnlineSkipUserSlice = createSlice({
  name: 'addOnlineSkipUserSlice',
  initialState: {
    addOnlineSkipData: {}, // Initialize responseData in the state


  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase( addOnlineSkipUserAsync.fulfilled, (state, action) => {
      state.addOnlineSkipData = action.payload; // Update responseData in the state after successful login
      // console.log(state.addSkipData)
    });
    // Additional extra reducers if needed
    builder.addCase(addOnlineSkipUserAsync.rejected, (state, action) => {
      state.addOnlineSkipData = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default addOnlineSkipUserSlice.reducer;
export const addOnlineSkipUserSliceAction = addOnlineSkipUserSlice.actions;