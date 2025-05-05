import React from "react";

const MentorProfile = ({ mentor, onClose }) => {
  if (!mentor) return null;

  // Hàm lấy chữ cái đầu của tên
  const getInitials = (firstName) => {
    return firstName ? firstName.charAt(0).toUpperCase() : "?";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500"
          >
            ✕
          </button>

          <div className="flex flex-col items-center mb-6">
            {mentor.avatar ? (
              <img
                src={mentor.avatar}
                alt={`${mentor.firstName} ${mentor.lastName}`}
                className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-md"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center text-white font-bold text-2xl border-2 border-white shadow-md">
                {getInitials(mentor.firstName)}
              </div>
            )}

            <h2 className="mt-4 text-xl font-bold text-gray-800">
              {mentor.firstName} {mentor.lastName}
            </h2>

            {mentor.designation && (
              <p className="text-gray-600 mt-1">{mentor.designation}</p>
            )}
          </div>

          <div className="space-y-4">
            {mentor.bio ? (
              <div>
                <h3 className="font-semibold text-gray-800">Giới thiệu</h3>
                <p className="mt-1 text-gray-600">{mentor.bio}</p>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-2">
                Chưa có thông tin giới thiệu
              </div>
            )}

            <div>
              <h3 className="font-semibold text-gray-800">
                Thông tin liên hệ
              </h3>
              <p className="mt-1 text-gray-600">Email: {mentor.email}</p>
              {mentor.phone && (
                <p className="text-gray-600">SĐT: {mentor.phone}</p>
              )}
            </div>

            {mentor.socialMedia && (
              <div>
                <h3 className="font-semibold text-gray-800">Mạng xã hội</h3>
                <div className="mt-2 flex gap-3">
                  {mentor.socialMedia.facebook && (
                    <a
                      href={mentor.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600"
                    >
                      Facebook
                    </a>
                  )}
                  {mentor.socialMedia.twitter && (
                    <a
                      href={mentor.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400"
                    >
                      Twitter
                    </a>
                  )}
                  {mentor.socialMedia.linkedin && (
                    <a
                      href={mentor.socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-800"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
