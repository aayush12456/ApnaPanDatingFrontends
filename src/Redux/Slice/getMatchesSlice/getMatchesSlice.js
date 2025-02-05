import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios/axios'

export const getMatchesData = createAsyncThunk(
  'match/getMatch',
  async (userId, { rejectWithValue }) => {

    try {
      const response = await axios.get(`/filterUsers/${userId}`,{
        headers: { 'Cache-Control': 'no-cache' }
      }); 
      // console.log('response of filter user',response.data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const getMatchesSlice = createSlice({
  name: 'getMatches',
  initialState: {
    getMatchesArray:[],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMatchesData.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getMatchesData.fulfilled, (state, action) => {
      
      state.isLoading = false;
      state.getMatchesArray = action.payload;
      // console.log('matches data', state.getUserArray)
    });
    builder.addCase(getMatchesData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default getMatchesSlice.reducer;
export const getMatchesSiceActions = getMatchesSlice.actions;

