"use client"
import React , { useState , useEffect } from 'react'
import CardCarousal from './CardCarousal'
import { Carousel } from '@mantine/carousel';
import client from "@/apolloClient";
import { gql, useQuery } from "@apollo/client";
import { getProjectList, getProjects } from "@/services";
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';




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
       slideSize="33.4%"
       slideGap="xs"
       loop
       align="start"
       controlsOffset="xs"
      //  nextControlIcon={<IconArrowRight size={16} />}
      //  previousControlIcon={<IconArrowLeft size={16} />}
       withControls={projects && projects.length > 3} // Enable controls if projects is defined and there are more than three slides
       slidesToScroll={1}
      // breakpoints={[{ maxWidth: 'sm', slideSize: '100%' }]}
      breakpoints={[
        { maxWidth: 'md', slideSize: '50%' },
        { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
      ]}
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