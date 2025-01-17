import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const addNoneSongAsync = createAsyncThunk(
  'song/addNoneSongAsync',
  async (songObj, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/addNoneSong/${songObj.id}`, songObj, {
        headers: { 'Content-Type': 'application/json', }
      });
   
      if (!response.status === 200) {
        throw new Error('Failed to add movie data to mongodb database.');
      }
     
      const Responedata = response.data;
      console.log('none song data is',Responedata)
      return Responedata;
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const addNoneSongSlice = createSlice({
  name: 'addNoneSongData',
  initialState: {
    addNoneSongData: {}, // Initialize responseData in the state


  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addNoneSongAsync.fulfilled, (state, action) => {
      state.addNoneSongData = action.payload; // Update responseData in the state after successful login
      console.log(state.addNoneSongData)
    });
    // Additional extra reducers if needed
    builder.addCase( addNoneSongAsync.rejected, (state, action) => {
      state.addNoneSongData = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default addNoneSongSlice.reducer;
export const addNoneSongSliceAction = addNoneSongSlice.actions;