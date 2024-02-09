import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  message: '', 
};

const loadingSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    ShowLoading(state, action) { 
      state.loading = true;
      state.message = action.payload; 
    },
    HideLoading(state) {
      state.loading = false;
      state.message = ''; 
    },
  },
});

export const { ShowLoading, HideLoading } = loadingSlice.actions; 

export default loadingSlice.reducer;
