"use client"
import Sidebar from "../components/Sidebar";
import "./globals.css";
import { ApolloProvider, gql,useQuery } from "@apollo/client";
import { Inter } from "next/font/google";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });
import { Context } from "./context/context";
import client from "@/apolloClient";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const router = useRouter()
  const basisWidth = pathname !== "/login" ? "basis-4/5" : "basis-full";
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
          <div className={`${basisWidth} h-full bg-[#F8F7F7]`}>
          <ApolloProvider client={client}>
            <Context>

               {children}
            </Context>
            </ApolloProvider>
          </div>
        </div>
       
      </body>
    </html>
  );
}
