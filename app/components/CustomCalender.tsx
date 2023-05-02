"use client"
import {useState} from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './MyCalender.module.css'

interface Props{
    onChange:(date:Date)=>void;
    value:Date
}

const CustomCalender = (props:Props) => {
 
const {onChange,value}=props;
  return (
     <div className="w-full max-w-[500px] flex items-center justify-center border-b-2 border-gray-200 pb-10">
       <Calendar className={styles.calendar}  onChange={onChange} value={value} />
     </div>
  )
}

export default CustomCalender