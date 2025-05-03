import React from "react";
import { Avatar, Page, Icon, useNavigate } from "zmp-ui";
import { CalendarDays, Users } from "lucide-react";
import { useRecoilValue } from "recoil";
import { userState } from "../state";
import SearchBar from "../components/SearchComponent";

const Setting = () => {
  const notifications = [
    {
      action: "Nguyễn Văn B đã thêm nhân sự mới Trần Thị C",
      timeAgo: "30 phút trước",
    },
    {
      action: "Lê Thị D đã cập nhật lịch làm việc tuần 24/06 - 30/06",
      timeAgo: "2 giờ trước",
    },
    {
      action: "Phạm Văn E đã tạo công việc mới Phát triển tính năng ABC",
      timeAgo: "2 giờ trước",
    },
    {
      action: "Hệ thống đã gửi thông báo Cập nhật lịch làm việc",
      timeAgo: "6 giờ trước",
    },
  ];

  const { userInfo: user } = useRecoilValue(userState);
  const navigate = useNavigate();

  return (
    <Page className="page">
      <div className="flex items-center justify-between gap-4 mt-6">
        <SearchBar className="w-full py-2 rounded-full" />
        <div className="flex items-center gap-2">
          {/* bg-[#DCFCE7] */}
          <div className="bg-primary text-white rounded-lg p-2">
            <Icon icon="zi-notif" size={22} />
          </div>
          <Avatar
            story="default"
            size={40}
            //   online
            src={user.avatar.startsWith("http") ? user.avatar : undefined}
          >
            {user.avatar}
          </Avatar>
        </div>
      </div>
      <div className="mt-5">
        <p className="font-black text-2xl">Dashboard</p>
        <p className="mt-1">Xin chào, chúc bạn một ngày làm việc hiệu quả</p>
        <div className="mt-8">
          <div className="grid grid-cols-2 gap-4">
            <div
              className="bg-white rounded-lg px-3 py-5 flex flex-col gap-5"
              onClick={() => {
                navigate("/employees");
              }}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="bg-[#DBEAFE] p-2 text-blue-700 rounded-lg">
                    <Users className="size-6" />
                  </div>
                  <p className="bg-[#DCFCE7] text-xs px-3 py-1 rounded-full text-[#186636] font-semibold">
                    +2 tuần này
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-bold text-2xl">24</p>
                <p className="text-base text-gray-500 font-semibold">
                  Tổng nhân sự
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg px-3 py-5 flex flex-col gap-5">
              <div>
                <div className="flex items-center justify-between">
                  <div className="bg-[#FFEDD5] p-2 text-[#EA580C] rounded-lg">
                    <CalendarDays className="size-6" />
                  </div>
                  <p className="bg-[#FEE2E2] text-xs px-3 py-1 rounded-full text-[#A73636] font-semibold">
                    -2 tuần này
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-bold text-2xl">15</p>
                <p className="text-base text-gray-500 font-semibold">
                  Ca làm hôm nay
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-5 mt-4">
            <div>
              <p className="font-bold text-xl">Hoạt động gần đây</p>
              <span className="text-base text-gray-500 font-medium">
                Các hoạt động mới nhất trong hệ thống
              </span>
            </div>

            <div>
              {notifications.map((notification, index) => (
                <div key={index} className="flex gap-3 mt-3 items-center">
                  <Icon icon="zi-clock-1" size={18} />
                  <div className="text-xs">
                    <div className="flex gap-1">
                      <p className="font-bold">{notification.action}</p>
                    </div>
                    <div>
                      <p>{notification.timeAgo}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Setting;
