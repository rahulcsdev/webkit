"use client"
import Sidebar from "../components/Sidebar";
import "./globals.css";
import { gql,useQuery } from "@apollo/client";
import { Inter } from "next/font/google";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });
import { Context } from "./context/context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const router = useRouter()
  const basisWidth = pathname !== "/login" ? "4/5" : "full";
  const flex = pathname !== "/login" ? "flex flex-row" : "";



  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={`h-screen overflow-hidden ${flex}`}>
          {pathname !== "/login" && (
            <div className="basis-1/5 h-full ">
              <Sidebar />
            </div>
          )}
          <div className={`basis-${basisWidth} h-full bg-[#F8F7F7]`}>
            <Context>
               {children}
            </Context>
          </div>
        </div>
      </body>
    </html>
  );
}
