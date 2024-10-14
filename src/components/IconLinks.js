import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const IconLink = ({ to, icon, label, subMenu, setSelectedPage }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleToggle = (e) => {
    if (subMenu) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    } else {
      setSelectedPage(label);
      navigate(to);
    }
  };

  const handleSubMenuClick = (subMenuItem) => {
    setSelectedPage(subMenuItem.label);
    navigate(subMenuItem.to);
  };

  return (
    <div className="menu-item">
      <div className="text-m flex items-center space-x-2 p-2 cursor-pointer" onClick={handleToggle}>
        {icon}
        <span>{label}</span>
      </div>

      {isExpanded && (
        <div className="sub-menu pl-6">
          {subMenu.map((item, index) => (
            <div
              key={index}
              className="text-m flex items-center space-x-2 p-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleSubMenuClick(item);
              }}
            >
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IconLink;
