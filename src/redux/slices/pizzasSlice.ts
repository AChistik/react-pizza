import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

type Pizza = {
  id: number;
  imageUrl: string;
  price: number;
  sizes: number[];
  title: string;
  types: number[];
};

enum Status {
  LOADING = 'loading',
  SUCCES = 'success',
  ERROR = 'error',
}

interface PizzasSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzasSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error |
};

export type SearchPizzaSlice = {
  category: string;
  search: string;
  sortBy: string;
  sortOrder: string;
  currentPage: string;
};

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaSlice>(
  'pizzas/fetchPizzasStatus',
  async (params) => {
    const { category, search, sortBy, sortOrder, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://62e6600ade23e263792b463f.mockapi.io/items?page=${currentPage}&limit=4&${category}${search}&sortBy=${sortBy}&order=${sortOrder}`,
    );

    return data;
  },
);

const pizzasSlice = createSlice({
  name: 'filtres',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCES;
      state.items = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
