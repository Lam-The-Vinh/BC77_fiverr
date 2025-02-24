import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jobAPI } from "../../services/apiService";


interface CongViec {
    id: number;
    tenCongViec: string;
    danhGia: number;
    giaTien: number;
    nguoiTao: number;
    hinhAnh: string;
    moTa: string;
    maChiTietLoaiCongViec: number;
    moTaNgan: string;
    saoCongViec: number;
  }
  
  export interface JobItem {
    id: number;
    congViec: CongViec; 
    tenLoaiCongViec: string;
    tenNhomChiTietLoai: string;
    tenChiTietLoai: string;
    tenNguoiTao: string;
    avatar: string;
  }
  
  interface JobDetailState {
    detail: JobItem | null;
    loading: boolean;
    error: string | null;
  }
  
  
  const initialState: JobDetailState = {
    detail: null,
    loading: false,
    error: null,
  };

export const fetchJobDetail = createAsyncThunk(
    "jobDetail/fetchJobDetail",
    async (id: number | string, { rejectWithValue }) => {
      try {
        const response = await jobAPI.getJobDetail(id);
        return response.content[0]; 
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
  

const jobDetailSlice = createSlice({
  name: "jobDetail",
  initialState,
  reducers: {
    resetJobDetail: (state) => {
      state.detail = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchJobDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchJobDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.detail = action.payload;
    });
    builder.addCase(fetchJobDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { resetJobDetail } = jobDetailSlice.actions;
export default jobDetailSlice.reducer;
