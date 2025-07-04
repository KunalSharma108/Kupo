import React from "react";
import "../../styles/ToolTip.css";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="tooltip-wrapper">
      {children}
      <div className="tooltip-bubble">{text}</div>
    </div>
  );
};

export default Tooltip;
