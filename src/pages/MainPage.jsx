import React, { Suspense } from "react";
import SearchComponent from "../components/SearchComponent";
import { courseData } from "../assets/asset";
import { Box, Page } from "zmp-ui";
import UserCard from "../components/user-card";
import { Icon } from "zmp-ui";
import { Link, NavLink } from "react-router-dom";
import KhoaHoc1 from "../assets/img/khoa_1.png";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import BottomNav from "../components/BottomNav";
import TopMentor from "../components/TopMentor";
const MainPage = () => {
  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  return (
    <Page className="bg-[#F9FAFB] w-full h-screen ">
      <div className="bg-primary p-5 rounded-b-[30px] py-10 shadow-custom">
        <Box flex justifyContent="space-between" alignItems="center" mt={2}>
          <div className="text-white">
            <Suspense>
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
            <TopMentor />
          </div>
        </div>

        <Box mt={8}>
          <Box flex justifyContent="space-between" alignItems="center">
            <p className="font-bold text-2xl">Cho người mới</p>
            <p className="font-bold text-primary">Xem tất cả</p>
          </Box>

          <Box mt={3}>
            <div className="flex gap-4 overflow-x-auto snap-x">
              {courseData.map((course) => (
                <Link to={`/learning-path/${course.id}`} key={course.id}>
                  <div className="bg-white min-w-[300px] flex-shrink-0 rounded-3xl snap-start border border-gray-300">
                    <div className="rounded-t-3xl overflow-hidden">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-44 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                      />
                    </div>
                    <div className="p-4 flex flex-col gap-2">
                      <p className="font-bold text-lg">{course.title}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-500 font-medium">
                          by {course.mentor}
                        </p>
                        <p className="text-primary font-bold">
                          {course.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Box>
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
