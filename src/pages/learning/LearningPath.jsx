// src/pages/LearningPath.jsx
import { useParams, useNavigate } from "react-router-dom";
import { courseData } from "../../assets/asset";
import { Box, Page } from "zmp-ui";
import { IoIosArrowBack } from "react-icons/io";
import { FiBookmark } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { FaBook, FaDollarSign, FaList } from "react-icons/fa6";
import ToggleTabs from "../../components/ui/ToggleTabs";
import { useState } from "react";
import Mentor1 from "../../assets/img/James_Anderson.png";
import { LuMessageCircleMore } from "react-icons/lu";

export default function LearningPath() {
  const { id } = useParams();
  const course = courseData.find((c) => c.id === Number(id));
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  if (!course) return <p className="p-4">Không tìm thấy lộ trình</p>;

  // Số bài học tối đa hiển thị
  const MAX_LESSONS_SHOWN = 10;
  // Đảm bảo remainingLessons không âm
  const remainingLessons = Math.max(
    0,
    course.lessons.length - MAX_LESSONS_SHOWN,
  );

  // Lấy số học viên từ participants hoặc members (nếu có)
  const studentCount = course.participants || course.members || 0;

  return (
    <Page className="page mb-24">
      {/* Header */}
      <Box my={6} flex justifyContent="space-between" alignItems="center">
        <IoIosArrowBack
          className="size-6 mr-3"
          onClick={() => navigate("/main-page")}
        />
        <p className="text-xl font-bold">Chi tiết lộ trình</p>
        <FiBookmark className="size-6" />
      </Box>

      {/* Ảnh khóa học - kiểu block thông thường */}
      <Box className="px-5">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full rounded-2xl"
        />
      </Box>

      {/* Content */}
      <Box
        py={5}
        flex
        flexDirection="column"
        alignItems="flex-start"
        className="gap-4"
      >
        {/* Thông tin khóa học */}
        <p className="text-2xl font-bold">{course.title}</p>
        <Box flex alignItems="center" className="gap-2 text-base font-medium">
          {/* <p className="text-gray-600 mt-1">by {course.author}</p> */}

          <FaStar className="text-[#FB9126] size-5" />
          <p className="text-black">
            {course.score} ({course.reviews} reviews)
          </p>
        </Box>

        <Box
          flex
          flexDirection="column"
          alignItems="flex-start"
          className="gap-2 text-[#9F9F9F] w-full"
        >
          <Box
            flex
            alignItems="center"
            className="gap-9 text-base font-medium w-full"
          >
            <Box flex alignItems="center" className="gap-2 w-2/5">
              <IoPeopleSharp />
              <p>{studentCount.toLocaleString()} học viên</p>
            </Box>
            <Box flex alignItems="center" className="gap-2 w-3/5">
              <FaList />
              <p>{course.category}</p>
            </Box>
          </Box>

          <Box
            flex
            alignItems="center"
            className="gap-9 text-base font-medium w-full"
          >
            <Box flex alignItems="center" className="gap-2 w-2/5">
              <FaBook />
              <p>{course.totalLessons} bài học</p>
            </Box>
            <Box flex alignItems="center" className="gap-2 w-3/5">
              <FaDollarSign />
              <p>{course.price}</p>
            </Box>
          </Box>
        </Box>
      </Box>

      <ToggleTabs
        className=""
        tabs={["About", "Lessons", "Reviews"]}
        onTabChange={(index) => setActiveTab(index)}
      />

      <Box className="">
        {activeTab === 0 && (
          <Box
            mt={4}
            flex
            flexDirection="column"
            className="bg-gray-100 rounded-xl"
          >
            <p className="text-lg font-bold">Tác giả</p>
            <Box
              flex
              alignItems="center"
              justifyContent="space-between"
              mt={2}
            >
              <Box flex alignItems="center" className="gap-4">
                <img
                  src={Mentor1}
                  className="size-14 rounded-full object-cover"
                />
                <Box flex flexDirection="column">
                  <p className="font-bold text-lg">{course.mentor}</p>
                  <p className="font-medium text-base text-gray-500">
                    {course.mentorDescription}
                  </p>
                </Box>
              </Box>
              <LuMessageCircleMore className="size-7 text-primary" />
            </Box>
            <p className="text-lg font-bold mt-4">Về lộ trình</p>
            <p className="text-base">{course.description}</p>
          </Box>
        )}

        {activeTab === 1 && (
          <Box mt={4}>
            <p className="text-lg font-bold mb-3">Nội dung khóa học</p>
            <div className="bg-gray-100 rounded-xl">
              <p className="text-sm px-2 py-1">
                {course.totalLessons} bài học
              </p>
              <div className="space-y-2 mt-2">
                {course.lessons &&
                  course.lessons
                    .slice(0, MAX_LESSONS_SHOWN)
                    .map((lesson, index) => (
                      <div
                        key={lesson.id}
                        className="bg-white p-3 rounded-lg flex items-center"
                      >
                        <div className="flex items-center">
                          <div className="bg-[#d7f7ec] text-secondary w-8 h-8 rounded-full flex items-center justify-center mr-3">
                            {index + 1}
                          </div>
                          <p className="font-medium">{lesson.title}</p>
                        </div>
                      </div>
                    ))}
                {remainingLessons > 0 && (
                  <div className="flex justify-center p-2">
                    <p className="text-primary font-medium">
                      + {remainingLessons} bài học khác
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Box>
        )}

        {activeTab === 2 && (
          <Box mt={4}>
            <p className="text-lg font-bold mb-3">Đánh giá khóa học</p>
            <div className="bg-gray-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-3xl font-bold">{course.score}</p>
                  <RatingStars rating={Math.floor(course.score)} />
                  <p className="text-sm text-gray-500 mt-1">
                    {course.reviews} đánh giá
                  </p>
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded-lg">
                  Viết đánh giá
                </button>
              </div>

              <div className="space-y-4">
                {course.reviewsData ? (
                  course.reviewsData.map((review) => (
                    <div key={review.id} className="bg-white p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={review.avatar}
                          alt={review.userName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium">{review.userName}</p>
                          <div className="flex items-center gap-2">
                            <RatingStars rating={review.rating} />
                            <span className="text-sm text-gray-500">
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">
                    Chưa có đánh giá nào.
                  </p>
                )}
              </div>
            </div>
          </Box>
        )}
      </Box>

      {/* Nút đăng ký cố định ở cuối trang */}
      <button
        className="fixed bottom-4 left-4 right-4 shadow-lg bg-primary text-white text-base py-4 rounded-3xl font-bold"
        onClick={() => navigate(`/learning-path/${course.id}/lessons`)}
      >
        Đăng ký ngay - {course.price}
      </button>
    </Page>
  );
}
