"use client"
import React , { useState , useEffect } from 'react'
import CardCarousal from './CardCarousel';
import Slider,{Settings} from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Carousel } from '@mantine/carousel';
import client from "@/apolloClient";
import { gql, useQuery } from "@apollo/client";
import { getTask } from "@/services";
import { Card } from '@mantine/core';

const MyCarousal = () => {


const [projectList, setProjectList] = useState([]);
const [milestoneList, setMileStoneList] = useState([]);
const [tasklist, setTaskList] = useState([]);
const [mileData, setMileData] = useState([])
  const { data, loading, error } = useQuery(getTask, {
    client,
  });
  useEffect(()=>{
    setTaskList(data?.tasks);
  },[data,loading]);


  console.log(data);
  
  return (
    <div className='max-w-[1195px]' >
   <Carousel
      slideSize="33.33%"
      slideGap="xs"
      loop
      align="start"
      controlsOffset="xs"
      withControls={tasklist && tasklist.length > 3}
    //   breakpoints={[{ maxWidth: 'sm', slideSize: '100%' }]}
      // breakpoints={[
      //   { maxWidth: 'md', slideSize: '50%' },
      //   { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
      // ]}
    >
      {tasklist &&
            tasklist.map((item,index) => (
          <Carousel.Slide key={index}>
            <CardCarousal data={item} />
          </Carousel.Slide>
        ))}
    </Carousel>
     
    </div>
  )
}

export default MyCarousal