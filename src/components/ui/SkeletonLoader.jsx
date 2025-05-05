import React from "react";

/**
 * Component hiển thị skeleton loading cho nội dung đang tải
 * @param {Object} props - Component props
 * @param {string} props.type - Loại skeleton: "course", "profile", "card", "list", "text"
 * @param {number} props.count - Số lượng skeleton hiển thị (cho dạng list)
 * @param {string} props.className - Class tùy chỉnh thêm vào
 */
const SkeletonLoader = ({ type = "text", count = 1, className = "" }) => {
  // Base class cho hiệu ứng pulse
  const baseClass = "bg-gray-200 animate-pulse rounded";

  // Skeleton cho khóa học
  const CourseSkeleton = () => (
    <div
      className={`${baseClass} min-w-[300px] h-[280px] flex-shrink-0 rounded-3xl ${className}`}
    >
      <div className="h-44 rounded-t-3xl bg-gray-300"></div>
      <div className="p-4 space-y-2">
        <div className="h-6 w-5/6 bg-gray-300 rounded"></div>
        <div className="flex justify-between">
          <div className="h-5 w-1/3 bg-gray-300 rounded"></div>
          <div className="h-5 w-1/4 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );

  // Skeleton cho profile
  const ProfileSkeleton = () => (
    <div className={`flex items-center space-x-4 ${className}`}>
      <div className={`${baseClass} w-14 h-14 rounded-full`}></div>
      <div className="space-y-2 flex-1">
        <div className={`${baseClass} h-5 w-2/3`}></div>
        <div className={`${baseClass} h-4 w-1/2`}></div>
      </div>
    </div>
  );

  // Skeleton cho card
  const CardSkeleton = () => (
    <div className={`${baseClass} w-full h-32 p-4 ${className}`}>
      <div className="flex h-full">
        <div
          className={`${baseClass} w-1/4 h-full rounded-lg bg-gray-300`}
        ></div>
        <div className="ml-4 flex-1 space-y-2">
          <div className={`${baseClass} h-6 w-3/4 bg-gray-300`}></div>
          <div className={`${baseClass} h-4 w-1/2 bg-gray-300`}></div>
          <div className={`${baseClass} h-4 w-1/3 bg-gray-300`}></div>
        </div>
      </div>
    </div>
  );

  // Skeleton cho list items
  const ListSkeleton = () => (
    <div className={`space-y-4 ${className}`}>
      {[...Array(count)].map((_, index) => (
        <div key={index} className="flex items-center space-x-4">
          <div className={`${baseClass} w-10 h-10 rounded-full`}></div>
          <div className="space-y-2 flex-1">
            <div className={`${baseClass} h-4 w-3/4`}></div>
            <div className={`${baseClass} h-3 w-1/2`}></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Skeleton cho text
  const TextSkeleton = () => (
    <div className={`space-y-2 ${className}`}>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className={`${baseClass} h-4 w-${index % 2 === 0 ? "full" : "3/4"}`}
        ></div>
      ))}
    </div>
  );

  // Hiển thị skeleton theo type
  switch (type) {
    case "course":
      return (
        <div className="flex gap-4 overflow-x-auto snap-x">
          {[...Array(count)].map((_, index) => (
            <CourseSkeleton key={index} />
          ))}
        </div>
      );
    case "profile":
      return <ProfileSkeleton />;
    case "card":
      return (
        <div className="space-y-4">
          {[...Array(count)].map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      );
    case "list":
      return <ListSkeleton />;
    case "text":
    default:
      return <TextSkeleton />;
  }
};

export default SkeletonLoader;
