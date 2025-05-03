// src/pages/LearningPathLesson.jsx
import { useParams, useNavigate } from "react-router-dom";
import { courseData } from "../../assets/asset";
import { Box, Page } from "zmp-ui";
import { IoIosArrowBack } from "react-icons/io";
import { FiUsers, FiCheck } from "react-icons/fi";

import { FaCirclePlay } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";

export default function LearningPathDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courseData.find((c) => c.id === Number(id));

  if (!course) return <p className="p-4">Không tìm thấy lộ trình</p>;

  // Tính toán tiến độ (giả lập)
  const progress = Math.round((1 / course.lessons.length) * 100);

  const handleLessonClick = (lesson, index) => {
    // Chỉ cho phép click vào bài 1 và bài 2
    if (index <= 1) {
      navigate(`/learning-path/${course.id}/lessons/${lesson.id}`);
    }
  };

  return (
    <Page className="">
      {/* Header */}
      <div className="bg-primary p-5 pt-10 rounded-b-3xl text-white">
        <Box flex alignItems="center" mb={2}>
          <IoIosArrowBack
            className="size-6 mr-3"
            onClick={() => navigate(-1)}
          />
          <p className="text-xl font-bold">Danh sách bài học</p>
        </Box>

        <Box mt={3}>
          <p className="text-lg font-bold">{course.title}</p>
          <div className="flex items-center mt-1 text-white/80">
            <FiUsers className="mr-1" />
            <Box flex alignItems="center" className="text-base text-white/90">
              <p>
                {course.participants
                  ? course.participants.toLocaleString()
                  : 0}
              </p>
              <p className="ml-1">học viên</p>
            </Box>
          </div>
        </Box>

        {/* Progress bar */}
        <Box mt={4} mb={2}>
          <div className="flex justify-between text-sm mb-1">
            <span>Tiến độ của bạn</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-white/30 rounded-full">
            <div
              className="h-full bg-white rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </Box>
      </div>

      {/* Nội dung bài học */}
      <Box p={4}>
        <div className="space-y-3 mt-4">
          {course.lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              onClick={() => handleLessonClick(lesson, index)}
              className={`relative bg-white p-4 rounded-xl shadow-sm flex items-start ${
                index <= 1 ? "cursor-pointer" : "opacity-70 cursor-not-allowed"
              }`}
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full mr-3 flex items-center justify-center 
              bg-[#d7f7ec] text-secondary text-lg"
              >
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="font-bold">{lesson.title}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {index === 0 ? "Đã hoàn thành" : "Bài học " + (index + 1)}
                </p>
              </div>

              {/* Hiển thị icon phù hợp theo vị trí bài học */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                {index === 0 && (
                  <div className="size-6 rounded-full bg-green-100 flex items-center justify-center">
                    <FiCheck className="text-green-500 text-xl" />
                  </div>
                )}

                {index === 1 && (
                  <FaCirclePlay className="text-primary text-xl size-6" />
                )}

                {index >= 2 && <FaLock className="text-gray-300 size-6" />}
              </div>
            </div>
          ))}
        </div>
      </Box>
    </Page>
  );
}
