'use client'
import { createContext } from "react"

export interface DrawerContextType {
    mainMenuOpen: boolean
    changeMainMenuOpen: (mainMenuOpen: boolean) => void
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined)

export default DrawerContext