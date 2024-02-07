import React, { useEffect } from 'react'
import {message} from 'antd'
import {GetUserInfo} from '../../src/api/users'

export default function Home() {
  const {userData, setUserData} = React.useState(null);

  const getData = async() =>{
    try {
      const res = await GetUserInfo()
      if(res.success){
        setUserData(res.data)
      }
    } catch (error) {
      message.error(error.message)
    }
  }
  useEffect(() =>{
    getData()
  },[])


  return (
    <div>Home</div>
  )
}
