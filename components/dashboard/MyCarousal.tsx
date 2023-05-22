"use client"
import React , { useState , useEffect } from 'react'
import { carousalData } from '../../utils/data'
import CardCarousal from './CardCarousal'
import Slider,{Settings} from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Carousel } from '@mantine/carousel';
import client from "@/apolloClient";
import { gql, useQuery } from "@apollo/client";
import { getProjectList, getProjects } from "@/services";
import { Card } from '@mantine/core';



const MyCarousal = () => {

  const [projects, setProjects] = useState([]);
  const { data, loading, error } = useQuery(getProjectList, {
    client,
  });
 
 
  useEffect(()=>{
    setProjects(data?.projects)
  },[data,loading]);

  // console.log(data);
  
  return (
    <div className='max-w-[1195px]' >
   <Carousel
      withIndicators
      slideSize="33.33%"
      slideGap="xs"
      loop
      align="start"
      controlsOffset="xs"
      // breakpoints={[{ maxWidth: 'sm', slideSize: '100%' }]}
      // breakpoints={[
      //   { maxWidth: 'md', slideSize: '50%' },
      //   { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
      // ]}
    >
      {projects?.map((item, index) => (
          <Carousel.Slide key={index}>
            <CardCarousal data={item} />
          </Carousel.Slide>
        ))}
    </Carousel>
     
    </div>
  )
}

export default MyCarousal