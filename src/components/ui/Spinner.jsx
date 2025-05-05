import React from "react";

/**
 * Component hiển thị spinner loading với kích thước và màu sắc có thể tùy chỉnh
 * @param {Object} props - Component props
 * @param {string} props.size - Kích thước spinner: "sm", "md", "lg" hoặc giá trị tùy chỉnh
 * @param {boolean} props.fullScreen - Hiển thị fullscreen với màu nền
 * @param {string} props.label - Text hiển thị bên dưới spinner
 * @param {string} props.className - Class tùy chỉnh thêm vào
 * @param {string} props.color - Màu sắc spinner: "primary", "gray", "blue", "red", "green"
 */
const Spinner = ({
  size = "md",
  fullScreen = false,
  label = "Đang tải...",
  className = "",
  color = "primary",
}) => {
  // Xác định kích thước dựa trên prop size
  const sizeMap = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-2",
    lg: "w-16 h-16 border-3",
    xl: "w-20 h-20 border-4",
  };

  // Xác định màu sắc dựa trên prop color
  const colorMap = {
    primary: "border-t-primary",
    gray: "border-t-gray-500",
    blue: "border-t-blue-500",
    red: "border-t-red-500",
    green: "border-t-green-500",
  };

  // Lấy class kích thước và màu sắc
  const sizeClass = sizeMap[size] || size;
  const colorClass = colorMap[color] || colorMap.primary;

  // Component spinner cơ bản
  const spinner = (
    <div className={`relative ${sizeClass} ${className}`}>
      <div
        className={`absolute inset-0 rounded-full border-2 border-gray-200`}
      ></div>
      <div
        className={`absolute inset-0 rounded-full border-2 ${colorClass} animate-spin`}
        style={{ borderTopWidth: "2px", borderStyle: "solid" }}
      ></div>
    </div>
  );

  // Nếu fullScreen, bọc spinner trong container full màn hình
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex flex-col items-center justify-center">
        {spinner}
        {label && (
          <div className="mt-4 flex items-center space-x-2">
            <div
              className={`h-1 w-10 bg-primary-300 rounded animate-pulse`}
            ></div>
            <p className="text-gray-600 font-medium">{label}</p>
            <div
              className={`h-1 w-10 bg-primary-300 rounded animate-pulse`}
            ></div>
          </div>
        )}
      </div>
    );
  }

  // Nếu có label, hiển thị spinner với label
  if (label) {
    return (
      <div className="flex flex-col items-center justify-center">
        {spinner}
        <p className="mt-2 text-gray-600 text-sm">{label}</p>
      </div>
    );
  }

  // Mặc định chỉ hiển thị spinner
  return spinner;
};

export default Spinner;
