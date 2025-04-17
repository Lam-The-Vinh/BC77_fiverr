import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jobAPI } from "../../services/apiService";

const initialState: JobListState = {
  jobs: [],
  loading: false,
  error: null,
};

export const fetchJobList = createAsyncThunk(
  "jobList/fetchJobList",
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await jobAPI.getJobsByChiTietLoai(id);
      return response.content;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const jobListSlice = createSlice({
  name: "jobList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchJobList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchJobList.fulfilled, (state, action) => {
      state.loading = false;
      state.jobs = action.payload;
    });
    builder.addCase(fetchJobList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default jobListSlice.reducer;
