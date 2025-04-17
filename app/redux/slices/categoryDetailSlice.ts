import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoryAPI } from "../../services/apiService";

const initialState: CategoryDetailState = {
  detail: null,
  loading: false,
  error: null,
};

export const fetchCategoryDetail = createAsyncThunk(
  "categoryDetail/fetchCategoryDetail",
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await categoryAPI.getCategoryDetail(id);
      return response.content[0];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const categoryDetailSlice = createSlice({
  name: "categoryDetail",
  initialState,
  reducers: {
    resetCategoryDetail: (state) => {
      state.detail = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategoryDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.detail = action.payload;
    });
    builder.addCase(fetchCategoryDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { resetCategoryDetail } = categoryDetailSlice.actions;
export default categoryDetailSlice.reducer;
