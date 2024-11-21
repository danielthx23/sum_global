"use client";

import { Tooltip } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";

interface AlterDeleteTooltipProps {
  postId: number;
  path: string;
}

const AlterDeleteTooltip = ({ postId, path }: AlterDeleteTooltipProps) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);
  const handleClose = () => setOpen(false);

  return (
    <Tooltip
      title={
        <div className="flex flex-col items-start p-4">
          <Link
            href={`${path}/update/${postId}`}
            className="text-sm text-foregroundlight hover:underline"
          >
            Alterar
          </Link>
          <Link
            href={`${path}/delete/${postId}`}
            className="mt-2 text-sm text-red-600 hover:underline"
          >
            Deletar
          </Link>
        </div>
      }
      placement="bottom"
      open={open}
      onClose={handleClose}
      arrow
      disableTouchListener
      disableFocusListener
      disableHoverListener
      slotProps={{
        tooltip: {
            sx: {
              padding: '0.2rem',
              bgcolor: "var(--backgroundopacity80)",
              color: "var(--foregroundlight)",
              borderRadius: "8px",
              backdropFilter: "blur(4px)",
              border: "1px solid var(--foregroundopacity20)",
              "& .MuiTooltip-arrow": {
                  color: "var(--backgroundopacity80)",
                },
              
            },
          },
      }}
    >
      <button
        onClick={handleToggle}
        className="py-2 px-4 rounded-md text-xl text-foregroundlight bg-transparent hover:bg-foregroundopacity20 transition-all"
      >
        <BsThreeDots/>
      </button>
    </Tooltip>
  );
};

export default AlterDeleteTooltip;
