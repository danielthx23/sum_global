import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import DrawerProvider from "@/contexts/drawercontext/drawerprovider.context";
import Nav from "@/components/navbar/navbar.component";
import Footer from "@/components/footer/footer.component";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Sum+",
  description: "Plataforma de comercio de energia entre empresas e concessonárias de energia limpa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DrawerProvider>
          <Nav />
          {children}
          <Footer />
        </DrawerProvider>
      </body>
    </html>
  );
}
