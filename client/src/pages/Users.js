import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { GetAllUsers } from '../api/users'
import { Table, message } from 'antd'
import PageTitle from '../components/PageTitle'

export default function Users() {
  const [users, setUsers] = React.useState([])
  const dispatch = useDispatch()

  const getData = async () =>{
    try {
      //dispatch(ShowLoading())
    const res = await GetAllUsers()
    //dispatch(HideLoading())
    if(res.success){
      setUsers(res.data)
    }else{
      message.error(res.message)
    }
    } catch (error) {
      //dispatch(HideLoading())
      message.error(error.message)
    }
  }

  const colums = [
    {
      title:"First Name",
      dataIndex: "firstName",
    },{
      title:"Last Name",
      dataIndex: "lastName",
    },{
      title:"Email",
      dataIndex: "email",
    },{
      title:"Mobile Number",
      dataIndex: "phoneNumber",
    },
  ]

  useEffect(()=>{
    getData()
  },[])
  return (
    <div>
    <PageTitle title="Users" />
    <Table dataSource={users} columns={colums} className='mt-2'/>
    </div>
  )
}
