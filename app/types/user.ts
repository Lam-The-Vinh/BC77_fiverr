
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    birthday: string;
    gender: boolean;
    role: string;
    skill: string[];
    certification: string[];
    bookingJob: string[];
  }

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}
