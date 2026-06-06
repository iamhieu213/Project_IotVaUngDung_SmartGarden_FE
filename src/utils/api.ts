import axios from "axios";

const API_BASE_URL = 'http://localhost:3000/api'

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type' : 'application/json',
    },
});

//Tu dong dinh kem AccessToken vao Header truoc khu gui request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

// 2. Response Interceptor: Xử lý xoay vòng Refresh Token tự động khi gặp lỗi 401
api.interceptors.response.use(
  (response) => {
    // Trả về response bình thường nếu không có lỗi
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // Kiểm tra nếu Backend báo lỗi 401 (Hết hạn Token) và request này chưa từng thử lại
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu đã thử lại một lần để tránh lặp vô tận
      
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          // Gọi API làm mới token (Sử dụng Axios gốc thay vì instance "api" để tránh đính kèm token cũ)
          const res = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
            refreshToken
          });
          if (res.data.success) {
            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data.data;
            // Lưu trữ cặp token mới vào LocalStorage
            localStorage.setItem('accessToken', newAccessToken);
            localStorage.setItem('refreshToken', newRefreshToken);
            // Gắn Access Token mới vào Authorization Header của request gốc ban đầu
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            // Tiến hành thực thi lại request gốc ban đầu
            return api(originalRequest);
          }
        } catch (refreshError) {
          console.error('Refresh Token không hợp lệ hoặc đã hết hạn:', refreshError);
        }
      }
      // Nếu không có Refresh Token hoặc API làm mới trả về lỗi
      console.warn('Phiên đăng nhập hết hạn. Đang đăng xuất và chuyển về trang login...');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
export default api;