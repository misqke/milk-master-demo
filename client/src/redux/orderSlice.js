import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  milks: [],
  cratesPerStack: "6",
};

for (let i = 0; i < 50; i++) {
  const milk = {
    id: i + 1,
    stacks: "",
    crates: "",
  };
  initialState.milks.push(milk);
}

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    updateStacks: (state, { payload }) => {
      state.milks[payload.id - 1].stacks = payload.value;
    },
    updateCrates: (state, { payload }) => {
      state.milks[payload.id - 1].crates = payload.value;
    },
    updateCratesPerStack: (state, { payload }) => {
      state.cratesPerStack = payload;
    },
  },
});

export const { updateStacks, updateCrates, updateCratesPerStack } =
  orderSlice.actions;
export default orderSlice.reducer;
