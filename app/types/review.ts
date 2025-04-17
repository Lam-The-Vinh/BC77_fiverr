interface Review {
  id: number;
  saoBinhLuan: number;
  noiDung: string;
}

interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}
