import { createSlice } from "@reduxjs/toolkit";

let initialState = [];

for (let i = 0; i < 47; i++) {
  const milk = {
    id: i + 1,
    shelf: "",
    crates: "",
  };
  initialState.push(milk);
}

const inventorySlice = createSlice({
  name: "inventory",
  initialState: initialState,
  reducers: {
    updateShelf: (state, { payload }) => {
      state[payload.index].shelf = payload.value;
    },
    updateCrates: (state, { payload }) => {
      state[payload.index].crates = payload.value;
    },
  },
});

export const { updateShelf, updateCrates } = inventorySlice.actions;
export default inventorySlice.reducer;
