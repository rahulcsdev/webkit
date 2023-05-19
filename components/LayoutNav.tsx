"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const LayoutNav = ({ children }: { children: React.ReactNode }) => {
  const myDivRef = useRef<any>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { current: myDiv } = myDivRef;
      if (myDiv.scrollTop > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    const { current: myDiv } = myDivRef;
    myDiv.addEventListener("scroll", handleScroll);

    return () => {
      myDiv.removeEventListener("scroll", handleScroll);
    };
  }, [myDivRef]);

  return (
    <div
      className="h-full overflow-y-scroll myGrid "
      id="my-div"
      ref={myDivRef}
    >
      <Navbar isScrolling={isScrolling} />
      {children}
      <Footer />
    </div>
  );
};

export default LayoutNav;
