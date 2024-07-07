import { ColorItem } from '@/components/forms/app/colors';
import { RadiusItem } from '@/components/forms/app/radius';
import { SpacingItem } from '@/components/forms/app/spacing';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  color: {} as ColorItem,
  radius: {} as RadiusItem,
  spacing: {} as SpacingItem,
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setColor(state, action: { payload: ColorItem }) {
      state.color = action.payload;
    },
    setRadius(state, action: { payload: RadiusItem }) {
      state.radius = action.payload;
    },
    setSpacing(state, action: { payload: SpacingItem }) {
      state.spacing = action.payload;
    },
    setConfig(state, action: { payload: typeof initialState }) {
      state.color = action.payload.color;
      state.radius = action.payload.radius;
      state.spacing = action.payload.spacing;
    },
  },
});

export const { setColor, setRadius, setSpacing, setConfig } =
  configSlice.actions;
export default configSlice.reducer;
