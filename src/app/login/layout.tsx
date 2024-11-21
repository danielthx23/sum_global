import { ReactNode } from "react"

interface LoginLayoutProps {
  children: ReactNode
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
  return <main className="w-full flex flex-col gap-1 justify-center content-center h-fit p-4 py-16">
      {children}
  </main>
}

export default LoginLayout