import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../../services/apiService";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  avatar: string | null;
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

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await userAPI.getUsers();
  const users = Array.isArray(response) ? response : response.content ?? [];
  return users;
});

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id: number) => {
    await userAPI.deleteUser(id);
    return id;
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, data }: { id: number; data: Partial<User> }) => {
    const response = await userAPI.updateUser(id, data);
    if (response && response.id) {
      return response;
    }
    return { ...data, id } as User;
  }
);

export const addUser = createAsyncThunk(
  "user/addUser",
  async (data: Partial<User>) => {
    const response = await userAPI.addUser(data);
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error fetching users";
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const updated = action.payload;
      const index = state.users.findIndex((u) => u.id === updated.id);
      if (index !== -1) {
        state.users[index] = { ...updated };
      }
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.users.push(action.payload);
    });
  },
});

export default userSlice.reducer;
