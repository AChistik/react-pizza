import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
export type CartItem = {
  id: string;
  imageUrl: string;
  title: string;
  type: string;
  size: number;
  count: number;
  price: number;
};

interface cartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const initialState: cartSliceState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type,
      );
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    minusProduct(state, action: PayloadAction<CartItem>) {
      const findItem: CartItem | undefined = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type,
      );
      if (findItem) {
        if (findItem.count === 1) {
          state.items = state.items.filter((item) => item !== findItem);
        } else {
          findItem.count--;
        }
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeProduct(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type,
      );
      state.items = state.items.filter((item) => item !== findItem);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    clearProducts(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const { addProduct, minusProduct, removeProduct, clearProducts } = cartSlice.actions;

export default cartSlice.reducer;
