import React from "react";

const TopMentor = () => {
  const users = [
    {
      id: 1,
      name: "Jacob",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Claire",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Priscilla",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      id: 4,
      name: "Wade",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      id: 5,
      name: "Kathry",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    },
  ];

  return (
    <div className="flex gap-4 overflow-x-auto py-4 px-1 scrollbar-hide">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex flex-col items-center min-w-[75px] snap-start"
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full rounded-full object-cover border-2 border-white shadow"
          />
          <p className="mt-2 font-semibold text-sm text-center text-gray-800">
            {user.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TopMentor;
