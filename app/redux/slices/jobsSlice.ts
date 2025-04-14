import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jobRentalService } from "../../services/apiService";
export interface JobRental {
  id: number;
  maCongViec: number;
  maNguoiThue: number;
  ngayThue: string;
  hoanThanh: boolean;
}

interface JobRentalState {
  data: JobRental[];
  loading: boolean;
  error: string | null;
}

const initialState: JobRentalState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchJobRentals = createAsyncThunk(
  "jobRental/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await jobRentalService.getAll();
      return res.content as JobRental[];
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const addJobRental = createAsyncThunk(
  "jobRental/add",
  async (data: Partial<JobRental>, { rejectWithValue }) => {
    try {
      const res = await jobRentalService.add(data);
      return res.content as JobRental;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const getJobRentalDetail = createAsyncThunk(
  "jobRental/detail",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await jobRentalService.getDetail(id);
      return res.content as JobRental;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateJobRental = createAsyncThunk(
  "jobRental/update",
  async (
    { id, data }: { id: number; data: Partial<JobRental> },
    { rejectWithValue }
  ) => {
    try {
      const res = await jobRentalService.update(id, data);
      return res.content as JobRental;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteJobRental = createAsyncThunk(
  "jobRental/delete",
  async (id: number) => {
      await jobRentalService.delete(id);
      return id;
  }
);

export const completeJobRental = createAsyncThunk(
  "jobRental/complete",
  async (rentalId: number, { rejectWithValue }) => {
    try {
      const res = await jobRentalService.complete(rentalId);
      return res.content as JobRental;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const jobRentalSlice = createSlice({
  name: "jobRental",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobRentals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobRentals.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchJobRentals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addJobRental.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateJobRental.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteJobRental.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
      })
      .addCase(completeJobRental.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      });
  },
});

export default jobRentalSlice.reducer;
