import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMentors } from "../utils/apiUtils";
import SkeletonLoader from "./ui/SkeletonLoader";

const TopMentor = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadMentors = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMentors();
      console.log("Dữ liệu mentor đã xử lý:", data);
      setMentors(data);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
      setError("Không thể kết nối với server. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMentors();
  }, []);

  // Hàm lấy chữ cái đầu của tên
  const getInitials = (firstName) => {
    return firstName ? firstName.charAt(0).toUpperCase() : "?";
  };

  // Xử lý khi click vào mentor
  const handleMentorClick = (mentor) => {
    navigate(`/mentor/${mentor.id}`);
  };

  // Hiển thị skeleton loading khi đang tải
  if (loading) {
    return (
      <div className="flex gap-4 overflow-x-auto">
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center min-w-[75px]"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="mt-2 w-14 h-3 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
      </div>
    );
  }

  // Hiển thị lỗi với nút thử lại
  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500 mb-3">{error}</p>
        <button
          onClick={loadMentors}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          Thử lại
        </button>
      </div>
    );
  }

  // Hiển thị khi không có mentor
  if (mentors.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">Chưa có mentor nào.</div>
    );
  }

  // Hiển thị danh sách mentor
  return (
    <div className="flex gap-4 overflow-x-auto py-2 px-1 scrollbar-hide">
      {mentors.map((mentor) => (
        <div
          key={mentor.id}
          className="flex flex-col items-center min-w-[75px] snap-start"
          onClick={() => handleMentorClick(mentor)}
        >
          <div className="cursor-pointer active:scale-95 transition-transform">
            {mentor.profilePicture ? (
              <img
                src={mentor.profilePicture}
                alt={`${mentor.firstName} ${mentor.lastName}`}
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl border-2 border-white shadow">
                {getInitials(mentor.firstName)}
              </div>
            )}
          </div>
          <p className="mt-2 font-semibold text-sm text-center text-gray-800">
            {mentor.firstName} {mentor.lastName}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TopMentor;
