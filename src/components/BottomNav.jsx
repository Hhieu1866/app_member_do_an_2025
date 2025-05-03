import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  IoHomeOutline,
  IoHome,
  IoBookOutline,
  IoBook,
  IoSettingsOutline,
  IoSettings,
  IoPersonOutline,
  IoPerson,
  IoStarOutline,
  IoStar,
} from "react-icons/io5";

const BottomNav = () => {
  const location = useLocation();

  // Nếu đang ở route "/", không hiển thị BottomNav
  if (location.pathname === "/") {
    return null;
  }

  const navItems = [
    {
      id: 1,
      name: "Home",
      path: "/main-page",
      iconOutline: <IoHomeOutline size={24} />,
      iconFill: <IoHome size={24} />,
    },
    {
      id: 2,
      name: "Lessons",
      path: "/lessons-list",
      iconOutline: <IoBookOutline size={24} />,
      iconFill: <IoBook size={24} />,
    },
    {
      id: 3,
      name: "Favorites",
      path: "/favorites",
      iconOutline: <IoStarOutline size={24} />,
      iconFill: <IoStar size={24} />,
    },
    {
      id: 4,
      name: "Profile",
      path: "/User",
      iconOutline: <IoPersonOutline size={24} />,
      iconFill: <IoPerson size={24} />,
    },
    {
      id: 5,
      name: "Settings",
      path: "/setting",
      iconOutline: <IoSettingsOutline size={24} />,
      iconFill: <IoSettings size={24} />,
    },
  ];

  return (
    <nav
      className="fixed bottom-5 left-5 right-5 bg-primary flex justify-around py-4 px-3 rounded-full 
        shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]"
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <NavLink
            key={item.id}
            to={item.path}
            className={`flex flex-col items-center ${
              isActive ? "text-white" : "text-gray-300"
            }`}
          >
            {isActive ? item.iconFill : item.iconOutline}
            <span className="text-xs font-medium mt-1">{item.name}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default BottomNav;
