import {IoHomeOutline,IoPrint} from 'react-icons/io5'
import {BsClipboardCheck,BsPersonPlus,BsCalendarEvent,BsFolder2Open, BsInbox, BsMic,} from 'react-icons/bs'
import {RxCube} from 'react-icons/rx'
import { FiMessageSquare } from 'react-icons/fi'
import { RiLinksLine } from 'react-icons/ri'
import { HiOutlineMail } from 'react-icons/hi'
import { MdOutlineFileCopy, MdWifiCalling2 } from 'react-icons/md'
import { GiStairsGoal } from 'react-icons/gi'
 
export const navLinks=[
   {
    icon:<IoHomeOutline className='text-2xl' />,
    name:"dashboard",
    link:'/'
   },
   {
    icon:<IoPrint className='text-2xl'/>,
    name:"projects",
    link:'/projects'
   },
   {
    icon:<BsClipboardCheck className='text-2xl'/>,
    name:"tasks",
    link:'/tasks'
   },
   {
    icon:<BsPersonPlus className='text-2xl'/>,
    name:"Employees",
    link:'/employees'
   },
   {
      icon:<GiStairsGoal className='text-2xl'/>,
      name:"Mildstone",
      link:'/mildstone'
     },
   {
    icon:<RxCube className='text-2xl'/>,
    name:"desk",
    link:'/desk'
   },
   {
    icon:<BsCalendarEvent className='text-2xl'/>,
    name:"calender",
    link:'/calender'
   },
   // {
   //  icon:<BsFolder2Open className='text-2xl'/>,
   //  name:"others",
   //  link:'/'
   // },

    
]

export const cartData=[
  {
   id:1,
   title:"Investment",
   cost:35000,
   revenue:65,
   bg:'bg-[#5773FF]',
   color:"text-[#fff]",
   type:'Monthly',
   sbg:'bg-[#d0d8ff]'
  },
  {
   id:2,
   title:"Anual",
   cost:25100,
   revenue:35,
   bg:'bg-[#FFCF52]',
   color:"text-[#212529]",
   type:'Anual',
   sbg:'bg-[#fff2cf]'
  },
  {
   id:3,
   title:"Cost",
   cost:33000,
   revenue:85,
   bg:'bg-[#50C6B4]',
   color:"text-[#fff]",
   type:'Today',
   sbg:'bg-[#ceefea]'
  },
  {
   id:3,
   title:"Profit",
   cost:3500,
   revenue:55,
   bg:'bg-[#51BBFE]',
   color:"text-[#fff]",
   type:'weekly',
   sbg:'bg-[#ceecff]'
  }
]

export const progressData=[
   {
      id:1,
      title:"UI/UX Design",
      bg:'bg-[#F35421]',
      sbg:'bg-[#fccfc1]',
      percentage:65
   },
   {
      id:2,
      title:"Development",
      bg:'bg-[#0023d0]',
      sbg:'bg-[#d0d8ff]',
      percentage:59
   },
   {
      id:3,
      title:"Testing",
      bg:'bg-[#cf9700]',
      sbg:'bg-[#fff2cf]',
      percentage:78
   },
]


export const boxCardData=[
  
      {
         id:1,
         title:"Cloud Service Theme",
         desc:"Exclusively for cloud-based/ Startup theme.",
         bg:'#5773FF',
         btn:'high',
         percentage:40,
         img:2,
      },
      {
         id:2,
         title:"Automotive WordPress",
         desc:"Dealership-based business WordPress theme",
         bg:'#F35421',
         btn:"Medium",
         percentage:15,
         img:3,
      },
      {
         id:3,
         title:"Online Education",
         desc:"Remote students and teachers dashboard.",
         bg:'#FFCF52',
         btn:'low',
         percentage:30,
         img:4
      },
      {
         id:4,
         title:"Blog/Magazine Theme",
         desc:"Launch visually appealing Blog theme.",
         bg:'#50C6B4',
         btn:'low',
         percentage:40,
         img:3
      },
 
]

export const dataDev=[
   {
      icon:<FiMessageSquare className={`text-[#F35421] text-2xl `} />,
      title:"Direct Development",
      subTitle:"Unveling the design system"
   },
   {
      icon:<BsInbox className={`text-[#5773FF] text-2xl `} />,
      title:"action point assigned",
      subTitle:"Unveling the design system"
   },
   {
      icon:<HiOutlineMail className={`text-[#FFCF52] text-2xl `} />,
      title:"Private Notes",
      subTitle:"Unveling the design system"
   },
   {
      icon:<MdWifiCalling2 className={`text-[#50C6B4] text-2xl `} />,
      title:"Support Request",
      subTitle:"Unveling the design system"
   },
]


export const carousalData=[
   {
     title:"Product list view changes",
     date:"02/02/2021",
     percentage:60,
     bg:'bg-[#50C6B4]',
     sbg:'bg-[#ceefea]',
     btn:'SEO',
     image:4,
     color:'#50C6B4'
   },
   {
     title:"Add multiple theme options",
     date:"02/02/2021",
     percentage:60,
     bg:'bg-[#FFCF52]',
     sbg:'bg-[#fff2cf]',
     btn:'Development',
     image:4,
     color:'#cf9700'
   },
   {
     title:"Admin Panel Cuatomization",
     date:"02/02/2021",
     percentage:60,
     bg:'bg-[#0023d0]',
     sbg:'bg-[#d0d8ff]',
     btn:'Content',
     image:4,
     color:'#0023d0'
   },
   {
     title:"Hotel Management App UI Kit",
     date:"02/02/2021",
     percentage:60,
     bg:'bg-[#b53209]',
     sbg:'bg-[#fccfc1]',
     btn:'Design',
     image:4,
     color:'#b53209'
   },
   {
     title:"General Improvment in progress",
     date:"02/02/2021",
     percentage:60,
     bg:'bg-[#007ece]',
     sbg:'bg-[#9bd8ff]',
     btn:'Testing',
     image:4,
     color:'#007ece '
   },
]

export const deskCarousalData=[
   {
     title:"name",
     date:"02/02/2021",
     percentage:60,
     bg:'bg-[#50C6B4]',
     sbg:'bg-[#ceefea]',
     btn:'SEO',
     image:4,
     color:'#50C6B4'
   },
   {
     title:"Add multiple theme options",
     date:"02/02/2021",
     percentage:60,
     bg:'bg-[#FFCF52]',
     sbg:'bg-[#fff2cf]',
     btn:'Development',
     image:4,
     color:'#cf9700'
   },
   {
     title:"Admin Panel Cuatomization",
     date:"02/02/2021",
     percentage:60,
     bg:'bg-[#0023d0]',
     sbg:'bg-[#d0d8ff]',
     btn:'Content',
     image:4,
     color:'#0023d0'
   },
   {
     title:"Hotel Management App UI Kit",
     date:"02/02/2021",
     percentage:60,
     bg:'bg-[#b53209]',
     sbg:'bg-[#fccfc1]',
     btn:'Design',
     image:4,
     color:'#b53209'
   },
   {
     title:"General Improvment in progress",
     date:"02/02/2021",
     percentage:60,
     bg:'bg-[#007ece]',
     sbg:'bg-[#9bd8ff]',
     btn:'Testing',
     image:4,
     color:'#007ece '
   },
   {
     title:"Hotel Management App UI Kit",
     date:"02/02/2021",
     percentage:60,
     bg:'bg-[#b53209]',
     sbg:'bg-[#fccfc1]',
     btn:'Design',
     image:4,
     color:'#b53209'
   },
   {
     title:"General Improvment in progress",
     date:"02/02/2021",
     percentage:60,
     bg:'bg-[#007ece]',
     sbg:'bg-[#9bd8ff]',
     btn:'Testing',
     image:4,
     color:'#007ece '
   },
   {
     title:"Hotel Management App UI Kit",
     date:"02/02/2021",
     percentage:60,
     bg:'bg-[#b53209]',
     sbg:'bg-[#fccfc1]',
     btn:'Design',
     image:4,
     color:'#b53209'
   },
   {
     title:"General Improvment in progress",
     date:"02/02/2021",
     percentage:60,
     bg:'bg-[#007ece]',
     sbg:'bg-[#9bd8ff]',
     btn:'Testing',
     image:4,
     color:'#007ece '
   },
]


export const dropDown=[
   {
      name:'in Progress',
      icon:<BsMic/>,
      value:'progress'
   },
   {
      name:'Priority',
      icon:<RiLinksLine/>,
      value:'priority'
   },
   {
      name:'Category',
      icon:<MdOutlineFileCopy/>,
      value:'category'
   },

]

export const deskDropDown=[
   {
      name:'Duplicate',
      icon:<BsMic/>,
      value:'duplicate'
   },
   {
      name:'Rename',
      icon:<RiLinksLine/>,
      value:'rename'
   },
   {
      name:'Delete',
      icon:<MdOutlineFileCopy/>,
      value:'delete'
   },

]

export const catergory=[
   {
      name:'Category',
      value:''
   },
   {
      name:'Andriod',
      value:'andriod'
   },
   {
      name:'IOS',
      value:'ios'
   },
   {
      name:'Ui/Ux Design',
      value:'ui/ux'
   },
   {
      name:'Development',
      value:'development'
   },
]