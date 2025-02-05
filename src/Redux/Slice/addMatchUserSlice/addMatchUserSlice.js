import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const addMatchUserAsync = createAsyncThunk(
  'match/addMatchUserAsync',
  async (matchObj, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/addMatchUser/${matchObj.id}`, matchObj, {
        headers: { 'Content-Type': 'application/json', }
      });
   
      if (!response.status === 200) {
        throw new Error('Failed to add movie data to mongodb database.');
      }
     
      const Responedata = response.data;
      // console.log('match user data is',Responedata)
      return Responedata;
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const addMatchUserSlice = createSlice({
  name: 'addMatchUserData',
  initialState: {
    addMatchUserData: {}, // Initialize responseData in the state


  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase( addMatchUserAsync.fulfilled, (state, action) => {
      state.addMatchUserData = action.payload; // Update responseData in the state after successful login
      // console.log(state.responseData)
    });
    // Additional extra reducers if needed
    builder.addCase( addMatchUserAsync.rejected, (state, action) => {
      state.addMatchUserData = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default addMatchUserSlice.reducer;
export const addMatchUserSliceAction = addMatchUserSlice.actions;