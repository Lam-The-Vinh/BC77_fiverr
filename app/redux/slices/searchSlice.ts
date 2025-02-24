import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jobAPI } from "../../services/apiService";

interface SearchState {
  results: any[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  results: [],
  loading: false,
  error: null,
};
export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (jobName: string) => {
    const response = await jobAPI.searchJobs(jobName);
    return response.content;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.results = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch search results";
      });
  },
});

export const { clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
