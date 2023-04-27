import React from 'react'
import { carousalData } from '../app/utils/data'
import CardCarousal from './CardCarousal'
import Slider,{Settings} from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



const MyCarousal = () => {
 


  const settings: Settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
     
    // prevArrow: (
    //   <button className="prev-arrow absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white rounded-full px-4 py-2 border-none cursor-pointer hover:bg-gray-700">
    //     Prev
    //   </button>
    // ),
    // nextArrow: (
    //   <button className="next-arrow absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white rounded-full px-4 py-2 border-none cursor-pointer hover:bg-gray-700">
    //     Next
    //   </button>
    // ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className='relative max-w-[1024px] h-auto  ' >
      <Slider {...settings}>
      {
        carousalData.map((item,index)=>(
          <CardCarousal key={index} data={item} />
        ))
      }
      </Slider>
   
     
    </div>
  )
}

export default MyCarousal