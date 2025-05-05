/**
 * Lớp quản lý cache đơn giản cho dữ liệu API
 */
class CacheManager {
  constructor() {
    this.cache = {};
    this.expiration = {};
    this.DEFAULT_TTL = 5 * 60 * 1000; // 5 phút mặc định
  }

  /**
   * Lưu dữ liệu vào cache
   * @param {string} key - Khóa cache
   * @param {any} data - Dữ liệu cần lưu
   * @param {number} ttl - Thời gian hết hạn tính bằng millisecond (mặc định 5 phút)
   */
  set(key, data, ttl = this.DEFAULT_TTL) {
    this.cache[key] = data;
    const expirationTime = Date.now() + ttl;
    this.expiration[key] = expirationTime;

    // Tự động xóa dữ liệu hết hạn
    setTimeout(() => {
      this.delete(key);
    }, ttl);

    // Lưu vào localStorage nếu có thể
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        localStorage.setItem(
          `cache_${key}`,
          JSON.stringify({
            data,
            expiration: expirationTime,
          }),
        );
      } catch (error) {
        console.warn("Không thể lưu cache vào localStorage:", error);
      }
    }
  }

  /**
   * Lấy dữ liệu từ cache
   * @param {string} key - Khóa cache
   * @returns {any|null} - Dữ liệu từ cache hoặc null nếu không tìm thấy hoặc hết hạn
   */
  get(key) {
    // Kiểm tra trong memory cache
    if (this.cache[key] && this.expiration[key] > Date.now()) {
      return this.cache[key];
    }

    // Kiểm tra trong localStorage nếu không có trong memory
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        const saved = localStorage.getItem(`cache_${key}`);
        if (saved) {
          const { data, expiration } = JSON.parse(saved);
          if (expiration > Date.now()) {
            // Khôi phục vào memory cache
            this.cache[key] = data;
            this.expiration[key] = expiration;
            return data;
          } else {
            // Xóa dữ liệu đã hết hạn
            localStorage.removeItem(`cache_${key}`);
          }
        }
      } catch (error) {
        console.warn("Lỗi khi đọc cache từ localStorage:", error);
      }
    }

    return null;
  }

  /**
   * Xóa dữ liệu khỏi cache
   * @param {string} key - Khóa cache
   */
  delete(key) {
    delete this.cache[key];
    delete this.expiration[key];

    if (typeof window !== "undefined" && window.localStorage) {
      try {
        localStorage.removeItem(`cache_${key}`);
      } catch (error) {
        console.warn("Không thể xóa cache từ localStorage:", error);
      }
    }
  }

  /**
   * Xóa toàn bộ cache
   */
  clear() {
    this.cache = {};
    this.expiration = {};

    if (typeof window !== "undefined" && window.localStorage) {
      try {
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith("cache_")) {
            localStorage.removeItem(key);
          }
        });
      } catch (error) {
        console.warn("Không thể xóa cache từ localStorage:", error);
      }
    }
  }
}

// Tạo instance singleton
const cacheManager = new CacheManager();

export default cacheManager;
