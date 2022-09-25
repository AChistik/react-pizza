import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SortType = {
  name: string;
  sortProperty: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price';
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sortProperty?: string;
  sort: SortType;
}

const initialState: FilterSliceState = {
  searchValue: '',
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
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<SortType>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFiltres(state, action: PayloadAction<FilterSliceState>) {
      state.categoryId = +action.payload.categoryId;
      state.currentPage = +action.payload.currentPage;
      state.sort = action.payload.sort;
    },
  },
});

export const { setSearchValue, setCategoryId, setSortType, setCurrentPage, setFiltres } =
  filterSlice.actions;

export default filterSlice.reducer;
