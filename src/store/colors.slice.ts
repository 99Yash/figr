import { ColorsFormData } from '@/components/forms/app/colors';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  colors: [] as ColorsFormData[],
};

export const colorsSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {
    setColors(state, action) {
      state.colors = action.payload;
    },
  },
});
