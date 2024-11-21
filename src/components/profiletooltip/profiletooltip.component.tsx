"use client";

import { Tooltip } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import useAuth from "@/hooks/useauth/useauth.hook";

const ProfileToolTipItem = () => {
  const { usuario, handleLogout } = useAuth();
  const [open, setOpen] = useState(false);

  if (!usuario) return null; // Handle cases where the user is not authenticated

  const handleToggle = () => setOpen(!open);
  const handleClose = () => setOpen(false);

  return (
    <Tooltip
      title={
        <div className="flex flex-col items-start p-4gap-2">
          <Link
            href={`/perfil`}
            className="text-sm text-foregroundlight hover:underline"
            onClick={handleClose}
          >
            Ver Perfil
          </Link>
          <button
            onClick={() => {
              handleLogout();
              handleClose();
            }}
            className="mt-2 text-sm text-red-600 hover:underline"
          >
            Log Out
          </button>
        </div>
      }
      placement="bottom"
      open={open}
      onClose={handleClose}
      disableTouchListener
      disableFocusListener
      disableHoverListener
      arrow
      slotProps={{
        tooltip: {
          sx: {
            padding: '1.5rem',
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
      <figure onClick={handleToggle} className="cursor-pointer w-[40px] h-auto">
        <Image
          src={usuario?.imagemFoto ? usuario?.imagemFoto : 'https://shopify.dev/assets/templated-apis-screenshots/pos-ui-extensions/2024-10/image-default.png'}
          alt="User Profile"
          width={400}
          height={400}
          className="w-full h-full object-cover rounded-full border border-foregroundopacity20"
        />
      </figure>
    </Tooltip>
  );
};

export default ProfileToolTipItem;
