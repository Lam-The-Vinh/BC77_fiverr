interface Category {
    id: number;
    tenLoaiCongViec: string;
  }
  
interface CategoryState {
    categories: Category[];
    loading: boolean;
    error: string | null;
  }