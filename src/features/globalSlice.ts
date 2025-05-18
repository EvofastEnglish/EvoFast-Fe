import { createSlice } from "@reduxjs/toolkit";

interface State {
  currentNumberQuestion: number;
}

// const TYPE_PREFIX = "global";
const initialState: State = { currentNumberQuestion: 1 };

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setCurrentNumberQuestion: (state, action) => {
      state.currentNumberQuestion = action.payload;
    },
  },
});

export const { setCurrentNumberQuestion } = globalSlice.actions;
export default globalSlice.reducer;
