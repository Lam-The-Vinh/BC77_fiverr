const API_BASE_URL = "https://fiverrnew.cybersoft.edu.vn/api";
const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3NyIsIkhldEhhblN0cmluZyI6IjExLzA2LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0OTYwMDAwMDAwMCIsIm5iZiI6MTcyMzIyMjgwMCwiZXhwIjoxNzQ5NzQ3NjAwfQ.waDB5mLZD-y9f0trHQhyWJiBNYXsC97HRlepmNYJKXE";

export const request = async (endpoint: string, method = "GET", body?: any) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    TokenCybersoft: TOKEN_CYBERSOFT,
  };

  const options: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.content || data.message || `Error ${response.status}`);
  }

  if (data.statusCode !== 200) {
    throw new Error(data.content || data.message || "error!");
  }

  return data;
};

export const authAPI = {
  login: (email: string, password: string) =>
    request("/auth/signin", "POST", { email, password }),
  register: (data: any) => request("/auth/signup", "POST", data),
};

export const categoryAPI = {
  getCategories: () => request("/cong-viec/lay-menu-loai-cong-viec"),
  getCategoryDetail: (id: number | string) =>
    request(`/cong-viec/lay-chi-tiet-loai-cong-viec/${id}`),
};

export const jobAPI = {
  getJobsByChiTietLoai: (id: number | string) =>
    request(`/cong-viec/lay-cong-viec-theo-chi-tiet-loai/${id}`),
  getJobDetail: (id: number | string) =>
    request(`/cong-viec/lay-cong-viec-chi-tiet/${id}`),
  getReviews: (jobId: number | string) =>
    request(`/binh-luan/lay-binh-luan-theo-cong-viec/${jobId}`),
  getCommentsByJob: (maCongViec: number | string) =>
    request(`/binh-luan/lay-binh-luan-theo-cong-viec/${maCongViec}`),
  searchJobs: (jobName: string) =>
    request(`/cong-viec/lay-danh-sach-cong-viec-theo-ten/${jobName}`),
};

export const userAPI = {
  getUsers: () => request("/users"),
  deleteUser: (id: number) => request(`/users?id=${id}`, "DELETE"),
  updateUser: (id: number, data: any) => request(`/users/${id}`, "PUT", data),
  addUser: (data: any) => request("/users", "POST", data),
};

export const jobRentalService = {
  getAll: () => request("/thue-cong-viec", "GET"),

  add: (data: any) => request("/thue-cong-viec", "POST", data),

  search: (params: { pageIndex: number; pageSize: number; keyword?: string }) =>
    request("/thue-cong-viec/phan-trang-tim-kiem", "POST", params),

  getDetail: (id: number) => request(`/thue-cong-viec/${id}`, "GET"),

  update: (id: number, data: any) =>
    request(`/thue-cong-viec/${id}`, "PUT", data),

  delete: (id: number) => request(`/thue-cong-viec/${id}`, "DELETE"),

  complete: (rentalId: number) =>
    request(`/thue-cong-viec/hoan-thanh-cong-viec/${rentalId}`, "POST"),
};
