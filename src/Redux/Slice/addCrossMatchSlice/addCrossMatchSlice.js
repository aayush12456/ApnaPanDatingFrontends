import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const addCrossMatchAsync = createAsyncThunk(
  'User/addCrossMatchAsync',
  async (crossObj, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/addSkipUser/${crossObj.id}`, crossObj, {
        headers: { 'Content-Type': 'application/json', }
      });
   
      if (!response.status === 200) {
        throw new Error('Failed to add movie data to mongodb database.');
      }
     
      const Responedata = response.data;
      console.log('addCross data is',Responedata)
  
      return Responedata;
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const addCrossMatchSlice = createSlice({
  name: 'addCrossMatchData',
  initialState: {
    addCrossData: {}, // Initialize responseData in the state


  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase( addCrossMatchAsync.fulfilled, (state, action) => {
      state.addCrossData = action.payload; // Update responseData in the state after successful login
      // console.log(state.responseData)
    });
    // Additional extra reducers if needed
    builder.addCase( addCrossMatchAsync.rejected, (state, action) => {
      state.addCrossData = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default addCrossMatchSlice.reducer;
export const addCrossMatchSliceAction = addCrossMatchSlice.actions;