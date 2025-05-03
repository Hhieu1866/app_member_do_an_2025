import React, { useState } from "react";

const ToggleTabs = ({
  className = "",
  tabs = [],
  defaultActive = 0,
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState(defaultActive);
  const handleTabClick = (index) => {
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <div
      className={`flex items-center justify-between gap-2 text-gray-500 ${className}`}
    >
      <div
        className="border-y border-y-gray-300 flex justify-between items-center
       w-full gap-4 text-textColor font-semibold"
      >
        {tabs.map((tab, index) => (
          <p
            key={index}
            className={`px-5 py-4 text-center cursor-pointer flex-1 transition-all duration-200 ease-in-out ${
              activeTab === index
                ? "border-b-4 border-primary"
                : "border-b-4 border-transparent"
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ToggleTabs;
