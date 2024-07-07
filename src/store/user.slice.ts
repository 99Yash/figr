import { User } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  user: User | undefined;
}

const initialState: UserState = {
  user: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state: UserState, action: { payload: User | undefined }) {
      state.user = action.payload;
    },
  },
});
