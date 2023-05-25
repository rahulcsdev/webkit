import { IoHomeOutline, IoPrint } from "react-icons/io5";
import {
  BsClipboardCheck,
  BsPersonPlus,
  BsCalendarEvent,
  BsFolder2Open,
  BsInbox,
  BsMic,
  BsHourglass,
  BsFolder,
} from "react-icons/bs";
import { RxCube } from "react-icons/rx";
import { FiMessageSquare, FiLogOut, FiEdit } from "react-icons/fi";
import { RiLinksLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineFileCopy, MdWifiCalling2 } from "react-icons/md";
import { GiStairsGoal } from "react-icons/gi";

export const navLinks = [
  {
    icon: <IoHomeOutline />,
    name: "dashboard",
    link: "",
  },
  {
    icon: <IoPrint />,
    name: "projects",
    link: "projects",
  },
  {
    icon: <BsClipboardCheck />,
    name: "tasks",
    link: "tasks",
  },
  {
    icon: <BsPersonPlus />,
    name: "employees",
    link: "employees",
  },
  {
    icon: <GiStairsGoal />,
    name: "milestones",
    link: "milestones",
  },
  {
    icon: <RxCube />,
    name: "desk",
    link: "desk",
  },
];

export const timelineFolder = {
  icon: <BsFolder className="text-2xl" />,
  name: "time entry",
};

export const timelineLinks = [
  {
    icon: <BsHourglass className="text-2xl" />,
    name: "Time Entry",
    link: "timeline",
  },
  {
    icon: <BsHourglass className="text-2xl" />,
    name: "approval as reporting Manager",
    link: "reportingManagerTimeLines",
  },
  {
    icon: <BsHourglass className="text-2xl" />,
    name: "approval as project Manager",
    link: "projectManagerTimeLines",
  },
];

export const profileLinks = [
  {
    icon: <FiEdit />,
    name: "my profile",
    link: "/profile",
  },
  {
    icon: <FiLogOut />,
    name: "logout",
    link: "/login",
  },
];

export const cartData = [
  {
    id: 1,
    title: "Investment",
    cost: 35000,
    revenue: 65,
    bg: "bg-[#5773FF]",
    color: "text-[#fff]",
    type: "Monthly",
    sbg: "bg-[#d0d8ff]",
  },
  {
    id: 2,
    title: "Anual",
    cost: 25100,
    revenue: 35,
    bg: "bg-[#FFCF52]",
    color: "text-[#212529]",
    type: "Anual",
    sbg: "bg-[#fff2cf]",
  },
  {
    id: 3,
    title: "Cost",
    cost: 33000,
    revenue: 85,
    bg: "bg-[#50C6B4]",
    color: "text-[#fff]",
    type: "Today",
    sbg: "bg-[#ceefea]",
  },
  {
    id: 3,
    title: "Profit",
    cost: 3500,
    revenue: 55,
    bg: "bg-[#51BBFE]",
    color: "text-[#fff]",
    type: "weekly",
    sbg: "bg-[#ceecff]",
  },
];

export const progressData = [
  {
    id: 1,
    title: "UI/UX Design",
    bg: "bg-[#F35421]",
    sbg: "bg-[#fccfc1]",
    percentage: 65,
  },
  {
    id: 2,
    title: "Development",
    bg: "bg-[#0023d0]",
    sbg: "bg-[#d0d8ff]",
    percentage: 59,
  },
  {
    id: 3,
    title: "Testing",
    bg: "bg-[#cf9700]",
    sbg: "bg-[#fff2cf]",
    percentage: 78,
  },
];

export const boxCardData = [
  {
    id: 1,
    title: "Cloud Service Theme",
    desc: "Exclusively for cloud-based/ Startup theme.",
    bg: "#5773FF",
    btn: "high",
    percentage: 40,
    img: 2,
  },
  {
    id: 2,
    title: "Automotive WordPress",
    desc: "Dealership-based business WordPress theme",
    bg: "#F35421",
    btn: "Medium",
    percentage: 15,
    img: 3,
  },
  {
    id: 3,
    title: "Online Education",
    desc: "Remote students and teachers dashboard.",
    bg: "#FFCF52",
    btn: "low",
    percentage: 30,
    img: 4,
  },
  {
    id: 4,
    title: "Blog/Magazine Theme",
    desc: "Launch visually appealing Blog theme.",
    bg: "#50C6B4",
    btn: "low",
    percentage: 40,
    img: 3,
  },
];

export const dataDev = [
  {
    icon: <FiMessageSquare className={`text-[#F35421] text-2xl `} />,
    title: "Direct Development",
    subTitle: "Unveling the design system",
  },
  {
    icon: <BsInbox className={`text-[#5773FF] text-2xl `} />,
    title: "action point assigned",
    subTitle: "Unveling the design system",
  },
  {
    icon: <HiOutlineMail className={`text-[#FFCF52] text-2xl `} />,
    title: "Private Notes",
    subTitle: "Unveling the design system",
  },
  {
    icon: <MdWifiCalling2 className={`text-[#50C6B4] text-2xl `} />,
    title: "Support Request",
    subTitle: "Unveling the design system",
  },
];

export const UserSkiilsData = [
  { 
    image:'assets/01.png',
    title:"Adobe Photoshop",
    percentage: 85,
    
  },
  { 
    image:'assets/02.png',
    title:"Figma",
    percentage: 85,
    
  },
  { 
    image:'assets/03.png',
    title:"Figma",
    percentage: 85,
     
  },
  { 
    image:'assets/04.png',
    title:"Adobe Photoshop",
    percentage: 85,
    
  },
  { 
    image:'assets/05.png',
    title:"Adobe Photoshop",
    percentage: 85,
    
  },
  { 
    image:'assets/06.png',
    title:"Adobe Photoshop",
    percentage: 85,
    
  }
]

export const carousalData = [
  {
    title: "Product list view changes",
    date: "02/02/2021",
    percentage: 60,
    bg: "bg-[#50C6B4]",
    sbg: "bg-[#ceefea]",
    btn: "SEO",
    image: 4,
    color: "#50C6B4",
  },
  {
    title: "Add multiple theme options",
    date: "02/02/2021",
    percentage: 60,
    bg: "bg-[#FFCF52]",
    sbg: "bg-[#fff2cf]",
    btn: "Development",
    image: 4,
    color: "#cf9700",
  },
  {
    title: "Admin Panel Cuatomization",
    date: "02/02/2021",
    percentage: 60,
    bg: "bg-[#0023d0]",
    sbg: "bg-[#d0d8ff]",
    btn: "Content",
    image: 4,
    color: "#0023d0",
  },
  {
    title: "Hotel Management App UI Kit",
    date: "02/02/2021",
    percentage: 60,
    bg: "bg-[#b53209]",
    sbg: "bg-[#fccfc1]",
    btn: "Design",
    image: 4,
    color: "#b53209",
  },
  {
    title: "General Improvment in progress",
    date: "02/02/2021",
    percentage: 60,
    bg: "bg-[#007ece]",
    sbg: "bg-[#9bd8ff]",
    btn: "Testing",
    image: 4,
    color: "#007ece ",
  },
];

export const deskCarousalData = [
  {
    title: "name",
    date: "02/02/2021",
    percentage: 60,
    bg: "bg-[#50C6B4]",
    sbg: "bg-[#ceefea]",
    btn: "SEO",
    image: 4,
    color: "#50C6B4",
  },
  {
    title: "Add multiple theme options",
    date: "02/02/2021",
    percentage: 60,
    bg: "bg-[#FFCF52]",
    sbg: "bg-[#fff2cf]",
    btn: "Development",
    image: 4,
    color: "#cf9700",
  },
  {
    title: "Admin Panel Cuatomization",
    date: "02/02/2021",
    percentage: 60,
    bg: "bg-[#0023d0]",
    sbg: "bg-[#d0d8ff]",
    btn: "Content",
    image: 4,
    color: "#0023d0",
  },
  {
    title: "Hotel Management App UI Kit",
    date: "02/02/2021",
    percentage: 60,
    bg: "bg-[#b53209]",
    sbg: "bg-[#fccfc1]",
    btn: "Design",
    image: 4,
    color: "#b53209",
  },
  {
    title: "General Improvment in progress",
    date: "02/02/2021",
    percentage: 60,
    bg: "bg-[#007ece]",
    sbg: "bg-[#9bd8ff]",
    btn: "Testing",
    image: 4,
    color: "#007ece ",
  },
  {
    title: "Hotel Management App UI Kit",
    date: "02/02/2021",
    percentage: 60,
    bg: "bg-[#b53209]",
    sbg: "bg-[#fccfc1]",
    btn: "Design",
    image: 4,
    color: "#b53209",
  },
  {
    title: "General Improvment in progress",
    date: "02/02/2021",
    percentage: 60,
    bg: "bg-[#007ece]",
    sbg: "bg-[#9bd8ff]",
    btn: "Testing",
    image: 4,
    color: "#007ece ",
  },
  {
    title: "Hotel Management App UI Kit",
    date: "02/02/2021",
    percentage: 60,
    bg: "bg-[#b53209]",
    sbg: "bg-[#fccfc1]",
    btn: "Design",
    image: 4,
    color: "#b53209",
  },
  {
    title: "General Improvment in progress",
    date: "02/02/2021",
    percentage: 60,
    bg: "bg-[#007ece]",
    sbg: "bg-[#9bd8ff]",
    btn: "Testing",
    image: 4,
    color: "#007ece ",
  },
];

export const dropDown = [
  { label: "All", value: "all" },
  { label: "New", value: "New" },
  {
    label: "Design",
    value: "Design Developement",
  },

  { label: "In Progress", value: "In Progress" },

  { label: "Testing", value: "Testing" },

  { label: "Completed", value: "Completed" },
];

export const deskDropDown = [
  {
    name: "Duplicate",
    icon: <BsMic />,
    value: "duplicate",
  },
  {
    name: "Rename",
    icon: <RiLinksLine />,
    value: "rename",
  },
  {
    name: "Delete",
    icon: <MdOutlineFileCopy />,
    value: "delete",
  },
];

export const catergory = [
  {
    name: "Category",
    value: "",
  },
  {
    name: "Andriod",
    value: "andriod",
  },
  {
    name: "IOS",
    value: "ios",
  },
  {
    name: "Ui/Ux Design",
    value: "ui/ux",
  },
  {
    name: "Development",
    value: "development",
  },
];

export const type = [
  {
    name: "Type",
    value: "",
  },
  {
    name: "Employee",
    value: "employee",
  },
];

export const role = [
  {
    name: "Role",
    value: "",
  },
  {
    name: "Designer",
    value: "designer",
  },
  {
    name: "Developer",
    value: "developer",
  },
  {
    name: "Manager",
    value: "manager",
  },
  {
    name: "BDE",
    value: "bde",
  },
  {
    name: "SEO",
    value: "seo",
  },
];

export const employeesData = [
  {
    id: 1,
    name: "Ruben Franci",
    email: "rubenfranci@gmail.com",
    phone: "9876152431",
    designation: "Project Manager",
    reportingmanager: "Thomson",
  },
  {
    id: 2,
    name: "Kaylynn Press",
    email: "kaylynnpress@gmail.com",
    phone: "9876152431",
    designation: "Frontend Developer",
    reportingmanager: "Corey",
  },
  {
    id: 3,
    name: "Corey Press",
    email: "coreypress@gmail.com",
    phone: "9876152431",
    designation: "FullStack Developer",
    reportingmanager: "Thomson",
  },
  {
    id: 4,
    name: "Zain Carder",
    email: "zaincarder@gmail.com",
    phone: "9876152431",
    designation: "FullStack Developer",
    reportingmanager: "Corey",
  },
  {
    id: 5,
    name: "Erin Donin",
    email: "erindonin@gmail.com",
    phone: "9876152431",
    designation: "Frontend Developer",
    reportingmanager: "Thomson",
  },
  {
    id: 6,
    name: "Mira Herwitz",
    email: "miraherwitz@gmail.com",
    phone: "9876152431",
    designation: "Project Manager",
    reportingmanager: "Corey",
  },
  {
    id: 7,
    name: "Kaiya George",
    email: "kaiyageorge@gmail.com",
    phone: "9876152431",
    designation: "Frontend Developer",
    reportingmanager: "Paityn",
  },
  {
    id: 8,
    name: "Lincoln George",
    email: "lincolngeorge@gmail.com",
    phone: "9876152431",
    designation: "FullStack Developer",
    reportingmanager: "Corey",
  },
  {
    id: 9,
    name: "Paityn Siphron",
    email: "paitynsiphron@gmail.com",
    phone: "9876152431",
    designation: "Project Manager",
    reportingmanager: "Kaiya",
  },
];

export const projectsData = [
  {
    title: "Theme development",
    desc: "Preparing framework of block-based WordPress Theme.",
    percentage: 25,
    btn: "high",
    people: 2,
  },
  {
    title: "Vuetify Dashboard in Admin",
    desc: "Start development server and check Vue project in browser.",
    percentage: 30,
    btn: "medium",
    people: 4,
  },
  {
    title: "Wordpress Dashboard Plugins",
    desc: "Customize your WordPress with smart WordPress plugins.",
    percentage: 40,
    btn: "low",
    people: 3,
  },
  {
    title: "Hotel Management App",
    desc: "Build a Cloud-based Hotel Management Theme.",
    percentage: 40,
    btn: "high",
    people: 3,
  },
  {
    title: "Video Streaming Theme",
    desc: "Launch OTT and media streaming theme.",
    percentage: 25,
    btn: "high",
    people: 3,
  },
  {
    title: "Medical Clinic Theme",
    desc: "Hospital and private clinic doctor's theme.",
    percentage: 30,
    btn: "meduium",
    people: 4,
  },
  {
    title: "Social Media Dashboard",
    desc: "Leverage data with Social Media Dashboard.",
    percentage: 18,
    btn: "low",
    people: 3,
  },
  {
    title: "Cloud Service Theme",
    desc: "Exclusively for cloud-based/ Startup theme.",
    percentage: 40,
    btn: "high",
    people: 3,
  },
  {
    title: "Automotive WordPress Theme",
    desc: "Dealership-based business WordPress theme.",
    percentage: 25,
    btn: "high",
    people: 2,
  },
  {
    title: "Online Education Template",
    desc: "Remote students and teachers dashboard.",
    percentage: 25,
    btn: "medium",
    people: 4,
  },
  {
    title: "Blog/Magazine Theme",
    desc: "Launch visually appealing Blog theme.",
    percentage: 15,
    btn: "low",
    people: 4,
  },
  {
    title: "XAMIN: AI Theme",
    desc: "Artificial Intelligence inspired WordPress theme.",
    percentage: 40,
    btn: "high",
    people: 3,
  },
];

export const employeeData = [
  {
    id: 1,
    name: "Rahul Pradhan",
    role: "Full Stack Developer",
  },
  {
    id: 2,
    name: "Krishna Kumar",
    role: "Full Stack Developer",
  },
  {
    id: 3,
    name: "Bhaskar",
    role: "Full Stack Developer",
  },
  {
    id: 4,
    name: "Vikalp",
    role: "Full Stack Developer",
  },
  {
    id: 5,
    name: "Mayank",
    role: "Full Stack Developer",
  },
  {
    id: 6,
    name: "Satyam",
    role: "Full Stack Developer",
  },
  {
    id: 7,
    name: "shreenidhi",
    role: "Full Stack Developer",
  },
];

export const milestones = [
  {
    name: "Hundred One",
    project: "Webkit",
    startDate: "Thu May 04 2023 00:00:00 GMT+0530 (India Standard Time)",
    endDate: "Thu May 11 2023 00:00:00 GMT+0530 (India Standard Time)",
    status: "completed",
  },
  {
    name: "Hundred Two",
    project: "E Commerce",
    startDate: "Thu May 04 2023 00:00:00 GMT+0530 (India Standard Time)",
    endDate: "Thu May 11 2023 00:00:00 GMT+0530 (India Standard Time)",
    status: "completed",
  },
  {
    name: "Hundred Three",
    project: "Fintech",
    startDate: "Thu May 04 2023 00:00:00 GMT+0530 (India Standard Time)",
    endDate: "Thu May 11 2023 00:00:00 GMT+0530 (India Standard Time)",
    status: "completed",
  },
  {
    name: "Hundred four",
    project: "Disnip Hotstar",
    startDate: "Thu May 04 2023 00:00:00 GMT+0530 (India Standard Time)",
    endDate: "Thu May 11 2023 00:00:00 GMT+0530 (India Standard Time)",
    status: "completed",
  },
  {
    name: "Hundred Five",
    project: "Google Chrome",
    startDate: "Thu May 04 2023 00:00:00 GMT+0530 (India Standard Time)",
    endDate: "Thu May 11 2023 00:00:00 GMT+0530 (India Standard Time)",
    status: "completed",
  },
]