import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filtres',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFiltres(state, action) {
      state.categoryId = +action.payload.categoryId;
      state.currentPage = +action.payload.currentPage;
      state.sort = action.payload.sort;
    },
  },
});

export const { setCategoryId, setSortType, setCurrentPage, setFiltres } = filterSlice.actions;

export default filterSlice.reducer;