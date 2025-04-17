interface ChiTietLoai {
  id: number;
  tenChiTiet: string;
}

interface NhomChiTietLoai {
  id: number;
  tenNhom: string;
  hinhAnh: string;
  dsChiTietLoai: ChiTietLoai[];
}

interface CategoryDetail {
  id: number;
  tenLoaiCongViec: string;
  dsNhomChiTietLoai: NhomChiTietLoai[];
}

interface CategoryDetailState {
  detail: CategoryDetail | null;
  loading: boolean;
  error: string | null;
}
