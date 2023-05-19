// "use client"
import React from 'react'
import client from '../../apolloClient/index'
 
import { GET_USERS } from '@/services'

const Test = async() => {
  const {data}=await client.query({
    query:GET_USERS
  });
console.log(data)
  return (
    <div>
      {
        data.users.map((item:any)=>(
          <h1 key={item.id}>{item.name}</h1>
        ))
      }
    </div>
  )
}

export default Test