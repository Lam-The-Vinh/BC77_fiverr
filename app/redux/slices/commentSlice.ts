import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jobAPI } from "../../services/apiService";

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};

export const fetchCommentsByJob = createAsyncThunk(
  "comments/fetchCommentsByJob",
  async (maCongViec: number | string, { rejectWithValue }) => {
    try {
      const response = await jobAPI.getCommentsByJob(maCongViec);
      return response.content;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    resetComments: (state) => {
      state.comments = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCommentsByJob.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCommentsByJob.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    });
    builder.addCase(fetchCommentsByJob.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { resetComments } = commentSlice.actions;
export default commentSlice.reducer;
