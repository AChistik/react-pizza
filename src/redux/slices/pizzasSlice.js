import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const pizzasSlice = createSlice({
  name: 'filtres',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
