<<<<<<< HEAD
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(()=>{
    router.push('/login');
  },[])

  return 
=======
// "use client"
import { Manrope } from "next/font/google";
import dynamic from "next/dynamic";
// import { boxCardData, cartData, dataDev, progressData } from "../utils/data";
 
// const Card = dynamic(() => import("../components/dashboard/Card"))
// const CardPro = dynamic(() => import("../components/dashboard/CardPro"))
// const BoxCard = dynamic(() => import("../components/dashboard/BoxCard"))
// const CustomCalender = dynamic(() => import("../components/CustomCalender"))
// const DataCard = dynamic(() => import("../components/dashboard/DataCard"))
// const MyCarousal = dynamic(() => import("../components/dashboard/MyCarousal"))
const LayoutNav = dynamic(() => import("@/components/LayoutNav"))
// import {useState} from 'react'
const manrope = Manrope({ subsets: ["latin"] });

export default function Home() { 
 
  // const [date, setDate] = useState<Date>(new Date());

// const handleDateChange=(date:Date)=>{
//   setDate(date);
// }
 
 
  return (
    <LayoutNav>
      <h1>Hello from dashboard</h1>
    </LayoutNav>
  );
>>>>>>> 29f999dbe3a92806f989d6039c8a5a84a52a65e5
}

