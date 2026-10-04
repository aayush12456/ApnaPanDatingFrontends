import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const getAllChatIdData = createAsyncThunk(
  'chat/getAllChatId',
  async (chatId, { rejectWithValue }) => {

    try {
      const response = await axios.get(`http://192.168.29.169:4000/chat/getAllChatId/${chatId}`); 
      // console.log('response of all user',response.data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);

const getAllChatIdSlice = createSlice({
  name: 'getAllChatId',
  initialState: {
    getAllChatIdArray:[],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearChatIdData: (state) => {
      state.getAllChatIdArray = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllChatIdData.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllChatIdData.fulfilled, (state, action) => {
      
      state.isLoading = false;
      state.getAllChatIdArray = action.payload;
      // console.log('toy data is', state.getUserArray)
    });
    builder.addCase(getAllChatIdData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default getAllChatIdSlice .reducer;
export const getAllChatIdActions = getAllChatIdSlice.actions;

export const {
  clearChatIdData
} = getAllChatIdSlice.actions;