interface congViec {
  tenCongViec: string;
  hinhAnh: string;
  giaTien: number;
  moTaNgan: string;
  saoCongViec: string;
  danhGia: string;
}

interface Job {
  id: number;
  avatar: string;
  tenNguoiTao: string;
  congViec: congViec;
  tenChiTietLoai: string;
}

interface JobListState {
  jobs: Job[];
  loading: boolean;
  error: string | null;
}
