import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMentors } from "../../utils/apiUtils";
import Spinner from "../../components/ui/Spinner";

const MentorDetail = () => {
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { mentorId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadMentorDetails = async () => {
      try {
        setLoading(true);
        const mentors = await fetchMentors();
        const foundMentor = mentors.find((m) => m.id === mentorId);

        if (foundMentor) {
          setMentor(foundMentor);
        } else {
          setError("Không tìm thấy thông tin mentor");
        }
      } catch (err) {
        console.error("Lỗi khi tải thông tin mentor:", err);
        setError("Không thể kết nối với server. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    loadMentorDetails();
  }, [mentorId]);

  // Hàm lấy chữ cái đầu của tên
  const getInitials = (firstName) => {
    return firstName ? firstName.charAt(0).toUpperCase() : "?";
  };

  // Xử lý nút quay lại
  const handleGoBack = () => {
    navigate(-1);
  };

  // Hiển thị loading
  if (loading) {
    return <Spinner size="lg" fullScreen={true} />;
  }

  // Hiển thị lỗi
  if (error || !mentor) {
    return (
      <div className="p-4 text-center min-h-screen flex flex-col justify-center">
        <p className="text-red-500 mb-3">{error || "Không tìm thấy mentor"}</p>
        <button
          onClick={handleGoBack}
          className="mx-auto px-4 py-2 bg-primary text-white rounded-md"
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen pb-20">
      {/* Header với nút quay lại */}
      <div className="bg-primary text-white shadow-md p-4 flex items-center">
        <button
          onClick={handleGoBack}
          className="mr-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white"
        >
          ←
        </button>
        <h1 className="text-lg font-semibold">Thông tin mentor</h1>
      </div>

      {/* Thông tin cơ bản */}
      <div className="bg-white rounded-lg shadow-md mx-4 mt-4 p-6">
        <div className="flex flex-col items-center mb-6">
          {mentor.avatar ? (
            <img
              src={mentor.avatar}
              alt={`${mentor.firstName} ${mentor.lastName}`}
              className="w-28 h-28 rounded-full object-cover border-2 border-white shadow-md"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-primary to-primary/70 flex items-center justify-center text-white font-bold text-3xl border-2 border-white shadow-md">
              {getInitials(mentor.firstName)}
            </div>
          )}

          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            {mentor.firstName} {mentor.lastName}
          </h2>

          {mentor.designation && (
            <p className="text-gray-600 mt-1">{mentor.designation}</p>
          )}
        </div>

        <div className="space-y-6">
          {mentor.bio ? (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Giới thiệu
              </h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                {mentor.bio}
              </p>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-4 border rounded-lg">
              Chưa có thông tin giới thiệu
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Thông tin liên hệ
            </h3>
            <div className="mt-3 space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {mentor.email}
              </p>
              {mentor.phone && (
                <p className="text-gray-600">
                  <span className="font-medium">SĐT:</span> {mentor.phone}
                </p>
              )}
            </div>
          </div>

          {mentor.socialMedia && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Mạng xã hội
              </h3>
              <div className="mt-3 flex gap-4">
                {mentor.socialMedia.facebook && (
                  <a
                    href={mentor.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-primary text-white rounded-lg"
                  >
                    Facebook
                  </a>
                )}
                {mentor.socialMedia.twitter && (
                  <a
                    href={mentor.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-primary text-white rounded-lg"
                  >
                    Twitter
                  </a>
                )}
                {mentor.socialMedia.linkedin && (
                  <a
                    href={mentor.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-primary text-white rounded-lg"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Phần các khóa học (placeholder) */}
      <div className="bg-white rounded-lg shadow-md mx-4 mt-4 p-6">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
          Khóa học của mentor này
        </h3>
        <div className="text-center text-gray-500 py-8">
          Chưa có khóa học nào được tạo
        </div>
      </div>
    </div>
  );
};

export default MentorDetail;
