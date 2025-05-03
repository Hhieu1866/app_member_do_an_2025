import { useParams, useNavigate } from "react-router-dom";
import { courseData } from "../../assets/asset";
import { Box, Page, Modal } from "zmp-ui";
import { IoIosArrowBack } from "react-icons/io";
import { FiBookmark, FiShare2, FiCheck } from "react-icons/fi";
import { useState, useEffect } from "react";
import { FaCirclePlay } from "react-icons/fa6";

export default function LessonContent() {
  const { id, lessonId } = useParams();
  const navigate = useNavigate();
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [navigateTo, setNavigateTo] = useState(null);

  const course = courseData.find((c) => c.id === Number(id));
  const lesson = course?.lessons.find((l) => l.id === Number(lessonId));
  const lessonIndex = course?.lessons.findIndex(
    (l) => l.id === Number(lessonId),
  );
  const nextLesson =
    lessonIndex < course?.lessons.length - 1
      ? course?.lessons[lessonIndex + 1]
      : null;

  // Xử lý điều hướng sau khi đóng modal
  useEffect(() => {
    if (navigateTo && !showCompletionModal) {
      navigate(navigateTo);
      setNavigateTo(null);
    }
  }, [navigateTo, showCompletionModal, navigate]);

  if (!course || !lesson) return <p className="p-4">Không tìm thấy bài học</p>;

  const handleComplete = () => {
    setShowCompletionModal(true);
  };

  const handleGoToNextLesson = () => {
    if (nextLesson) {
      setNavigateTo(`/learning-path/${id}/lessons/${nextLesson.id}`);
    } else {
      setNavigateTo(`/learning-path/${id}`);
    }
    setShowCompletionModal(false);
  };

  // Tính toán tiến độ bài học
  const lessonProgress = lessonIndex === 0 ? 100 : 0;

  return (
    <Page className=" bg-gray-50">
      {/* Header */}
      <div className="bg-primary p-5 pt-10 rounded-b-3xl text-white">
        <Box flex alignItems="center" mb={2}>
          <IoIosArrowBack
            className="size-6 mr-3"
            onClick={() => navigate(-1)}
          />
          <p className="text-xl font-bold flex-1 truncate pr-2">
            Nội dung bài học
          </p>
          <div className="flex items-center gap-4">
            <FiBookmark className="size-5" />
            <FiShare2 className="size-5" />
          </div>
        </Box>

        <Box mt={3}>
          <p className="text-lg font-bold truncate">{lesson.title}</p>
          <div className="flex items-center mt-1 text-white/80">
            <p className="text-sm truncate">
              Bài học {lessonIndex + 1}/{course.lessons.length} •{" "}
              {course.title}
            </p>
          </div>
        </Box>

        {/* Progress bar */}
        <Box mt={4} mb={2}>
          <div className="flex justify-between text-sm mb-1">
            <span>Tiến độ bài học</span>
            <span>{lessonProgress}%</span>
          </div>
          <div className="h-2 bg-white/30 rounded-full">
            <div
              className="h-full bg-white rounded-full"
              style={{ width: `${lessonProgress}%` }}
            ></div>
          </div>
        </Box>
      </div>

      {/* Content */}
      <Box p={4}>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          {/* Chỉ mục và biểu tượng bài học */}
          <div className="flex items-center mb-4">
            <div
              className="flex-shrink-0 w-10 h-10 rounded-full mr-3 flex items-center justify-center 
              bg-[#d7f7ec] text-secondary text-lg"
            >
              {lessonIndex + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-lg truncate">{lesson.title}</p>
            </div>
            {lessonIndex === 0 ? (
              <div className="flex-shrink-0 size-6 rounded-full bg-green-100 flex items-center justify-center">
                <FiCheck className="text-green-500 text-xl" />
              </div>
            ) : (
              <FaCirclePlay className="flex-shrink-0 text-primary text-xl size-6" />
            )}
          </div>

          {/* Nội dung bài học */}
          <div className="prose max-w-none text-gray-800 mt-6">
            <div className="whitespace-pre-line leading-relaxed text-base break-words text-pretty">
              {lesson.content}
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <Box flex className="gap-3" mt={6}>
          <button
            className="flex-1 border border-primary text-primary py-4 rounded-3xl font-bold"
            onClick={() => navigate(-1)}
          >
            Quay lại
          </button>

          <button
            className="flex-1 bg-primary text-white py-4 rounded-3xl font-bold"
            onClick={handleComplete}
          >
            Hoàn thành
          </button>
        </Box>
      </Box>

      {/* Modal xác nhận hoàn thành */}
      <Modal
        visible={showCompletionModal}
        title="Chúc mừng bạn!"
        onClose={() => setShowCompletionModal(false)}
        actions={[
          {
            text: "Ở lại trang này",
            close: true,
          },
          {
            text: nextLesson ? "Đến bài tiếp theo" : "Hoàn thành khóa học",
            bold: true,
            onClick: handleGoToNextLesson,
            close: false,
          },
        ]}
        description={
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <FiCheck className="text-green-500 text-3xl" />
              </div>
            </div>
            <p className="mb-2">
              Bạn đã hoàn thành bài học <strong>{lesson.title}</strong>!
            </p>
            <p className="text-gray-500">
              {nextLesson
                ? "Bạn có muốn tiếp tục với bài học tiếp theo không?"
                : "Chúc mừng bạn đã hoàn thành khóa học này!"}
            </p>
          </div>
        }
      />
    </Page>
  );
}
