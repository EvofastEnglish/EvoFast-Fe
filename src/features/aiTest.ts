import { AiTestResult } from "@/model/aiTest";
import aiTestService from "@/services/aiTest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const TYPE_PREFIX = "aiTest";
interface State {
  getAiTestloading: boolean;
  dataAiTests: AiTestResult;
}

const initialState: State = {
  getAiTestloading: false,
  dataAiTests: {
    aiTests: {
      pageIndex: 0,
      pageSize: 0,
      count: 0,
      data: [],
    },
  },
};

const getDataAiTests = createAsyncThunk(
  `${TYPE_PREFIX}/getDataAiTest`,
  async () => {
    const resutl = await aiTestService.getAiTests();
    return resutl;
  }
);

const aiTestSlice = createSlice({
  name: "aiTest",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getDataAiTests.pending, (state) => ({
      ...state,
      getAiTestloading: true,
    }));
    builder.addCase(getDataAiTests.fulfilled, (state, { payload }) => ({
      ...state,
      dataAiTests: payload,
      getAiTestloading: false,
    }));
    builder.addCase(getDataAiTests.rejected, (state) => ({
      ...state,
      getAiTestloading: false,
    }));
  },
});

export { getDataAiTests };
export default aiTestSlice.reducer;
