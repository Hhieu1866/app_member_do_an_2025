import React, { Suspense, useState, useEffect } from "react";
import SearchComponent from "../components/SearchComponent";
import { Box, Page } from "zmp-ui";
import UserCard from "../components/user-card";
import { Icon } from "zmp-ui";
import { Link } from "react-router-dom";
import KhoaHoc1 from "../assets/img/khoa_1.png";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import BottomNav from "../components/BottomNav";
import TopMentor from "../components/TopMentor";
import SkeletonLoader from "../components/ui/SkeletonLoader";
import { fetchCourses } from "../utils/apiUtils";

const MainPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  // Lấy danh sách khóa học khi component được mount
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setIsLoading(true);
        const coursesData = await fetchCourses(10);
        setCourses(coursesData);
        console.log("Dữ liệu khóa học đã xử lý:", coursesData);
      } catch (err) {
        console.error("Lỗi khi tải khóa học:", err);
        setError("Không thể tải danh sách khóa học");
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, []);

  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  // Render phần danh sách khóa học
  const renderCourseList = () => {
    if (isLoading) {
      return <SkeletonLoader type="course" count={3} />;
    }

    if (error) {
      return (
        <div className="flex justify-center items-center py-8">
          <p className="text-red-500">{error}</p>
        </div>
      );
    }

    if (!courses || courses.length === 0) {
      return (
        <div className="flex justify-center items-center py-8">
          <p className="text-gray-500">Không có khóa học nào</p>
        </div>
      );
    }

    return (
      <div className="flex gap-4 overflow-x-auto snap-x">
        {courses.map((course) => (
          <Link to={`/learning-path/${course.id}`} key={course.id}>
            <div className="bg-white min-w-[300px] flex-shrink-0 rounded-3xl snap-start border border-gray-300">
              <div className="rounded-t-3xl overflow-hidden">
                {course.thumbnail && (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-44 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                )}
                {!course.thumbnail && course.thumbnailUrl && (
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    className="w-full h-44 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                )}
                {!course.thumbnail && !course.thumbnailUrl && (
                  <div className="w-full h-44 bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500 text-sm">Không có ảnh</p>
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col gap-2">
                <p className="font-bold text-lg">{course.title}</p>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500 font-medium">
                    by {course.instructor?.firstName || ""}{" "}
                    {course.instructor?.lastName || ""}
                  </p>
                  <p className="text-primary font-bold">
                    {course.price > 0
                      ? `${course.price.toLocaleString()} VND`
                      : "Miễn phí"}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <Page className="bg-[#F9FAFB] w-full h-screen ">
      <div className="bg-primary p-5 rounded-b-[30px] py-10 shadow-custom">
        <Box flex justifyContent="space-between" alignItems="center" mt={2}>
          <div className="text-white">
            <Suspense fallback={<SkeletonLoader type="profile" />}>
              <UserCard />
            </Suspense>
          </div>
          <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-custom">
            <Icon size={24} icon="zi-notif" className="text-black" />
          </div>
        </Box>
        <div>
          <SearchComponent
            onSearch={handleSearch}
            className={"mt-8 font-medium rounded-[30px]"}
          />
        </div>
      </div>

      <div className="pr-5 pl-5 pt-5">
        <div className="">
          <Box flex justifyContent="space-between" alignItems="center">
            <p className="font-bold text-2xl">Top Mentors</p>
            <p className="text-primary text-lg font-bold">See all</p>
          </Box>
          <div className="flex gap-4 mt-3">
            <Suspense fallback={<SkeletonLoader type="list" count={5} />}>
              <TopMentor />
            </Suspense>
          </div>
        </div>

        <Box mt={8}>
          <Box flex justifyContent="space-between" alignItems="center">
            <p className="font-bold text-2xl">Cho người mới</p>
            <p className="font-bold text-primary">Xem tất cả</p>
          </Box>

          <Box mt={3}>{renderCourseList()}</Box>
        </Box>

        <div className="mt-10 mb-32">
          <p className="font-bold text-2xl">Lộ trình của bạn</p>
          <Box mt={3} flex flexDirection="column" className="gap-3">
            <Box
              flex
              justifyContent="space-between"
              alignItems="center"
              className="gap-3"
            >
              <Box>
                <img
                  src={KhoaHoc1}
                  width={120}
                  alt=""
                  className="rounded-xl"
                />
              </Box>

              <Box>
                <p className="font-bold">
                  Lộ trình HTML CSS cho người mới bắt đầu
                </p>
                <p className="mt-1">by DevHoang</p>
              </Box>

              <Box width={80}>
                <CircularProgressbar
                  value={80}
                  text={`80%`}
                  styles={buildStyles({
                    textSize: "24px",
                    pathColor: "#4f46e5",
                    textColor: "#000",
                    trailColor: "#dbd8d8",
                  })}
                />
              </Box>
            </Box>

            <Box
              flex
              justifyContent="space-between"
              alignItems="center"
              className="gap-3"
            >
              <Box>
                <img
                  src={KhoaHoc1}
                  width={120}
                  alt=""
                  className="rounded-xl"
                />
              </Box>

              <Box>
                <p className="font-bold">
                  Lộ trình HTML CSS cho người mới bắt đầu
                </p>
                <p className="mt-1">by DevHoang</p>
              </Box>

              <Box width={80}>
                <CircularProgressbar
                  value={20}
                  text={`20%`}
                  styles={buildStyles({
                    textSize: "24px",
                    pathColor: "#4f46e5",
                    textColor: "#000",
                    trailColor: "#dbd8d8",
                  })}
                />
              </Box>
            </Box>

            <Box
              flex
              justifyContent="space-between"
              alignItems="center"
              className="gap-3"
            >
              <Box>
                <img
                  src={KhoaHoc1}
                  width={120}
                  alt=""
                  className="rounded-xl"
                />
              </Box>

              <Box>
                <p className="font-bold">
                  Lộ trình HTML CSS cho người mới bắt đầu
                </p>
                <p className="mt-1">by DevHoang</p>
              </Box>

              <Box width={80}>
                <CircularProgressbar
                  value={40}
                  text={`40%`}
                  styles={buildStyles({
                    textSize: "24px",
                    pathColor: "#4f46e5",
                    textColor: "#000",
                    trailColor: "#dbd8d8",
                  })}
                />
              </Box>
            </Box>
          </Box>
        </div>
      </div>
      <BottomNav />
    </Page>
  );
};

export default MainPage;
