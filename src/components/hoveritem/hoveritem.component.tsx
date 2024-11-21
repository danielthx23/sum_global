"use client";

import { Tooltip, TooltipClasses } from "@mui/material";
import { ReactElement, ReactNode, useState } from "react";
import { BsChevronDown } from "react-icons/bs";

type OptionalTooltipClasses = Partial<TooltipClasses>;

interface HoverItemProps extends OptionalTooltipClasses {
  icon: ReactElement;
  itemTitle: string;
  tooltipItems?: Array<ReactNode>; 
  placement?: "top" | "bottom" | "left" | "right";
}

const HoverItem = ({
  itemTitle,
  tooltipItems,
  icon,
  placement = "bottom",
  ...HoverItemProps
}: HoverItemProps) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const TooltipContent = () => {
    if (!tooltipItems || tooltipItems.length === 0) {
      return null; 
    }

    return (
      <ul className="flex flex-col justify-center gap-4 p-8">
        {tooltipItems.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </ul>
    );
  };

  return (
    <li>
      <Tooltip
        title={<TooltipContent />}
        {...HoverItemProps}
        placement={placement}
        arrow
        onOpen={handleOpen}
        onClose={handleClose}
        slotProps={{
          tooltip: {
            sx: {
              width: "50vw",
              height: "fit-content",
              bgcolor: "var(--backgroundopacity80)",
              outline: "1px solid var(--foregroundopacity20)",
              backdropFilter: "blur(4px)",
              marginInline: "4rem",
              zIndex: 20,
              maxWidth: "none",
              boxSizing: "content-box",
              "& .MuiTooltip-arrow": {
                color: "var(--backgroundlight)",
              },
            },
          },
        }}
      >
        <div
          className={`flex items-center gap-2 border py-2 px-5 rounded-full ${
            !open
              ? "border-foregroundopacity20 bg-backgroundlight text-foregroundlight"
              : "text-foregroundlight border-foregroundopacity80 bg-transparent backdrop-blur-sm "
          } transition-all ease-in-out`}
        >
          {icon}
          <h1 className="text-sm">{itemTitle}</h1>
          <BsChevronDown
            size={"1.1rem"}
            className={`${open && "rotate-180 text-foreground "} transition-all ease-in-out`}
          />
        </div>
      </Tooltip>
      {open && <div />}
    </li>
  );
};

export default HoverItem;