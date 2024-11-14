"use client"

import ToolTipItem from "@/types/tooltipitem/tooltipitem.type";
import { Tooltip } from "@mui/material";
import { ReactElement, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import LinkRedirect from "../linkredirect/linkredirect.component";

interface HoverItemProps  {
  icon: ReactElement
  itemTitle: string
  placement?: "bottom-end" | "bottom-start" | "bottom" | "left-end" | "left-start" | "left" | "right-end" | "right-start" | "right" | "top-end" | "top-start" | "top" | undefined
  tooltipItems: Array<ToolTipItem>
}

const HoverItem = ({ itemTitle, placement, tooltipItems, icon }: HoverItemProps) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const TooltipContent = () => (
    <section className="flex flex-col justify-center gap-4 p-8">
      {tooltipItems.map(({ label, link, icon }) => (
        <li key={label} className="flex gap-3 text-sm items-center text-foregroundlight hover:text-foreground transition-all ease-in-out">
          {icon}
          <LinkRedirect title={label} link={link} key={label} />
        </li>
      ))}
    </section>
  );

  return (
    <li>
      <Tooltip title={<TooltipContent />}
        arrow
        onOpen={handleOpen}
        onClose={handleClose}
        slotProps={{
          tooltip: {
            sx: {
              width: '50vw',
              height: 'fit-content',
              bgcolor: 'var(--backgroundopacity80)',
              outline: '1px solid var(--foregroundopacity20)',
              backdropFilter: 'blur(4px)',
              marginInline: '4rem',
              zIndex: 20,
              maxWidth: 'none',
              boxSizing: 'content-box',
              '& .MuiTooltip-arrow': {
                color: 'var(--backgroundlight)',
              },
            },
          },
        }}
        placement={placement}>
        <div className={`flex items-center gap-2 border py-2 px-5 rounded-full ${!open ? 'border-foregroundopacity20 bg-backgroundlight text-foregroundlight'
          : 'text-foregroundlight border-foregroundopacity80 bg-transparent backdrop-blur-sm '} transition-all ease-in-out`}>
          {icon}
          <h1 className="text-sm">{itemTitle}</h1>
          <BsChevronDown size={"1.1rem"} className={`${open && 'rotate-180 text-foreground '} transition-all ease-in-out`} />
        </div>
      </Tooltip>
      {open && <div />}
    </li>
  )
}

export default HoverItem