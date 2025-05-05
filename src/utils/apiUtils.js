import axios from "axios";
import cacheManager from "./cacheUtils";

// URL API chính
const API_URL = "http://web-admin-do-an-2025-public.vercel.app/api";
// URL của server NextJS
const NEXT_URL = "http://web-admin-do-an-2025-public.vercel.app";

/**
 * Xử lý URL ảnh để đảm bảo ảnh hiển thị đúng
 * @param {string} imageUrl - URL ảnh từ API
 * @returns {string} URL ảnh hoàn chỉnh
 */
export const processImageUrl = (imageUrl) => {
  if (!imageUrl) return null;

  // Nếu đã là URL đầy đủ
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  // Nếu bắt đầu bằng /api -> cần ghép với domain
  if (imageUrl.startsWith("/api")) {
    return `${NEXT_URL}${imageUrl}`;
  }

  // Nếu là đường dẫn static trong NextJS (thường là /uploads)
  if (imageUrl.startsWith("/uploads") || imageUrl.startsWith("uploads")) {
    const formattedPath = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;
    return `${NEXT_URL}${formattedPath}`;
  }

  // Trường hợp khác - ghép với domain
  return `${NEXT_URL}/${imageUrl}`;
};

// Hàm lấy danh sách mentor từ API
export const fetchMentors = async () => {
  try {
    // Kiểm tra cache trước
    const cachedData = cacheManager.get("mentors");
    if (cachedData) {
      console.log("Trả về dữ liệu mentor từ cache");
      return cachedData;
    }

    console.log("Đang kết nối tới:", `${API_URL}/public/users`);

    const response = await axios.get(`${API_URL}/public/users`, {
      params: {
        role: "instructor", // Lọc theo role instructor
        limit: 10, // Giới hạn số lượng mentor hiển thị
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Dữ liệu nhận được:", response.data);

    // Xử lý dữ liệu trước khi trả về
    const processedData = response.data.users.map((mentor) => ({
      ...mentor,
      // Xử lý URL ảnh đại diện
      profilePicture: mentor.profilePicture
        ? processImageUrl(mentor.profilePicture)
        : null,
    }));

    // Lưu vào cache với thời gian 10 phút
    cacheManager.set("mentors", processedData, 10 * 60 * 1000);

    return processedData; // Trả về danh sách users đã xử lý
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu mentor:", error);
    throw error;
  }
};

// Hàm lấy danh sách khóa học từ API
export const fetchCourses = async (limit = 10, categoryId = null) => {
  try {
    // Tạo key cache dựa trên tham số
    const cacheKey = `courses_${limit}_${categoryId || "all"}`;

    // Kiểm tra cache trước
    const cachedData = cacheManager.get(cacheKey);
    if (cachedData) {
      console.log("Trả về dữ liệu khóa học từ cache");
      return cachedData;
    }

    console.log("Đang kết nối tới:", `${API_URL}/public`);

    // Chuẩn bị tham số
    const params = {
      type: "courses",
      limit,
    };

    // Thêm category nếu có
    if (categoryId) {
      params.category = categoryId;
    }

    const response = await axios.get(`${API_URL}/public`, {
      params,
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Dữ liệu khóa học nhận được:", response.data);

    // Xử lý dữ liệu trước khi trả về
    const processedData = response.data.map((course) => ({
      ...course,
      // Xử lý URL ảnh thumbnail
      thumbnail: course.thumbnail ? processImageUrl(course.thumbnail) : null,
      thumbnailUrl: course.thumbnailUrl
        ? processImageUrl(course.thumbnailUrl)
        : null,
    }));

    // Lưu vào cache với thời gian 5 phút
    cacheManager.set(cacheKey, processedData, 5 * 60 * 1000);

    return processedData; // Trả về danh sách khóa học đã xử lý
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu khóa học:", error);
    throw error;
  }
};
