import React from 'react';
import { Text } from "@mantine/core";
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"] });

const UserAbout = () => {
  return (
   <>
     <div className='mt-5'>
     <p className={`text-xl text-gray-600 mb-4 leading-9 ${manrope.className}`}>I am Web Developer from California. I code and design websites worldwide. Mauris variustellus vitae tristique sagittis. Sed aliquet, est nec auctor aliquet, orci ex vestibulum ex, non pharetra lacus erat ac nulla.</p>

    <p className={`text-xl text-gray-600 mb-4 leading-9 ${manrope.className}`}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis mattis nam ipsum pharetra porttitor eu orci, nisi. Magnis elementum vitae eu, dui et. Tempus etiam feugiat sem augue sed sed. Tristique feugiat mi feugiat integer consectetur sit enim penatibus. Quis sagittis proin fermentum tempus uspendisse ultricies. Tellus sapien, convallis proin pretium.
    </p>

    <p className={`text-xl text-gray-600 mb-2 leading-9 ${manrope.className}`}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis mattis nam ipsum pharetra porttitor eu. Tristique feugiat mi feugiat integer consectetur sit enim penatibus. Quis sagittis proin fermentum tempus uspendisse ultricies. Tellus sapien, convallis proin pretium.
    </p>
     </div>
   </>
  )
}

export default UserAbout;