"use client"
import React from 'react';
import LayoutNav from '@/components/LayoutNav';
import { Manrope } from "next/font/google";
import { Grid , Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { GrLocation } from "react-icons/gr";
import { BsBagCheck } from "react-icons/bs";
import { FaBirthdayCake } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { IoMailOpenOutline } from "react-icons/io5";
import UserNavbar from '@/components/userprofile/UserNavbar';

const manrope = Manrope({ subsets: ["latin"] });



const ProfileUser = () => {
  return (
   <>
   <LayoutNav>
    <div className='px-5 py-6'>
    <Grid>
      <Grid.Col span={4}>
      <Card shadow="sm" padding="lg" radius="lg" withBorder>
      <div className='mt-5'>
      <Card.Section className='mb-6 rounded'>
       <Grid>
        <Grid.Col span={4}>
        <Image
          src="assets/girl.jpg"
          height={160}
          alt="user-girl"
          className='mx-2'
        />
        </Grid.Col>
        <Grid.Col span={8}>
          <div className='mx-2'>
            <h1 className={`text-[2em] font-semibold mb-1 ${manrope.className} `}>
            Ruben Dokidis
            </h1>
            <p className={`text-[1.2em] font-semibold mb-4 ${manrope.className}`}>UI/UX Designer</p>
            <div className="relative">
                  <button
                    className={`bg-secondary text-white px-3 py-2 rounded-lg capitalize`}
                  >
                    Contact
                  </button>
                </div>
          </div>
        </Grid.Col>
       </Grid>
      </Card.Section>

      <Text fz="xl"  className={`text-gray-600 font-normal text-lg mb-6 ${manrope.className}`}>I am a Ux/UI designer. I spend my whole day, practically every day, experimenting with new designs, making illustartion, and animation.</Text>

      <ul>
        <li>
          <div className={`flex items-center font-normal text-gray-600  mb-4 ${manrope.className}`}>
            <GrLocation/>
            <p className=' text-gray-600 text-md mx-2'>Calefornia, U.S.A</p> 
        </div>
        </li>
        <li>
        <div className={`flex items-center font-normal text-gray-600 mb-4 ${manrope.className}`}>
            <BsBagCheck/>
            <p className=' text-gray-600 text-md mx-2'>SMCE Corp. Lead UI/UX Designer</p> 
        </div>
        </li>
        <li>
        <div className={`flex items-center font-normal text-gray-600 mb-4 ${manrope.className}`}>
            <FaBirthdayCake/>
          <p className=' text-gray-600 text-md mx-2'>March 25</p> 
        </div>
        </li>
        <li>
        <div className={`flex items-center font-normal text-gray-600 mb-4 ${manrope.className}`}>
            <BsTelephone/>
          <p className=' text-gray-600 text-md mx-2'>+91 01234 56789</p> 
        </div>
        </li>
        <li>
        <div className={`flex items-center font-normal text-gray-600 mb-4 ${manrope.className}`}>
            <IoMailOpenOutline/>
          <p className=' text-gray-600 text-md mx-2'>JoanDuo@property.com</p> 
        </div>
        </li>
      </ul>
      </div>
    </Card>
      </Grid.Col>
      <Grid.Col span={8}>
      <Card shadow="sm" padding="lg" radius="lg" withBorder>
      <Card.Section>
      <UserNavbar/>
      </Card.Section>
    </Card>
      </Grid.Col>
    </Grid>
    </div>
   </LayoutNav>
   </>
  )
}

export default ProfileUser;