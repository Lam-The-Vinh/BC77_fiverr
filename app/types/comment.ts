interface Comment {
  id: number;
  tenNguoiBinhLuan: string;
  avatar: string;
  saoBinhLuan: number;
  noiDung: string;
  ngayBinhLuan: number;
}

interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

interface CommentsSectionProps {
  maCongViec: string | number;
}
