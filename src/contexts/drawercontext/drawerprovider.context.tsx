'use client'
import { PropsWithChildren, useState } from "react";
import DrawerContext from "./drawercontext.context";

/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface DrawerProviderProps extends PropsWithChildren { }

const DrawerProvider = ({ children }: DrawerProviderProps) => {
    const [mainMenuOpen, setMainMenuOpen] = useState(false)

    const changeMainMenuOpen = (mainMenuOpen: boolean) => {
        setMainMenuOpen(!mainMenuOpen)
    }

    return (
        <DrawerContext.Provider value={{ mainMenuOpen, changeMainMenuOpen }}>
            {children}
        </DrawerContext.Provider>
    )
}

export default DrawerProvider