import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalCount:0, // Add totalCount to initialState
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
      state.totalCount++; // Increment totalCount
    },

    removeItem: (state, action) => {
      const itemName = action.payload;
      const itemToRemove = state.items.find(item => item.name === itemName);
      if (itemToRemove) {
        state.totalCount -= itemToRemove.quantity; // Decrement totalCount
        state.items = state.items.filter(item => item.name !== itemName);
      }
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        state.totalCount += (quantity - itemToUpdate.quantity); // Update totalCount
        itemToUpdate.quantity = quantity;
      }
    },
  },
});


export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
