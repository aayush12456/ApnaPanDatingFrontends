import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const credentialsAsync = createAsyncThunk(
  'credential/credentialAsync',
  async (credObj, { rejectWithValue }) => {
    try {
        const response = await axios.post(`/credUpload`, credObj, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.status === 200) {
        throw new Error('Failed to add register data to mongodb database.');
      }
    

      const Responedata = response.data;
      // console.log( 'add contact data ',Responedata)
      return Responedata
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const credentialSlice = createSlice({
  name: 'credObj',
  initialState: {
    credObj: {}, // Initialize responseData in the state
  },
  reducers: {
    credentialData: (state) => {
        state.credObj= {};
      },
  },
  extraReducers: (builder) => {
    builder.addCase(credentialsAsync.fulfilled, (state, action) => {
        state.credObj = action.payload; // Update responseData in the state after successful login
      // console.log('register data in slice',state.registerDataObj)
    });
    // Additional extra reducers if needed
    builder.addCase(credentialsAsync.rejected, (state, action) => {
        state.credObj = action.payload; // Update responseData even for rejected login attempt
    });
  },
});

export default credentialSlice.reducer;
export const credentialAction = credentialSlice.actions;
export const {credentialData} = credentialSlice.actions;