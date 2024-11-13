'use client'
import DrawerContext from "@/contexts/drawercontext/drawercontext.context"
import { useContext } from "react"

const useDrawer = () => {
    const context = useContext(DrawerContext)

    if (!context) {
        throw new Error("useDrawer must be used within a DrawerProvider")
    }

    return context
}

export default useDrawer