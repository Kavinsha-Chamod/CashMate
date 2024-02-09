import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { GetAllUsers, UpdateUserVerifiedStatus } from '../api/users'
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

  const updateStatus = async (record, isVerified) =>{
    try {
      const res = await UpdateUserVerifiedStatus({
        selectedUser: record._id,
        isVerified,
      })
      if(res.success){
        message.success(res.message)
        getData()
      }else{
        message.error(res.message)
      }
    } catch (error) {
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
    },{
      title: "Account Status",
      dataIndex: "isVerified",
      render: (text,record) =>{
        return text ? "Verified" : "Pending"
      }
    },{
      title:"Actions",
      dataIndex:"actions",
      render:(text, record) =>{
        return <div className='flex gap-1'>
        {record.isVerified ?(
          <button className='primary-outlined-btn' onClick={()=> updateStatus(record, false)}>Suspend</button>
          ):(
          <button className='primary-outlined-btn' onClick={()=> updateStatus(record, true)}>Activate</button>

          )}
        </div>
      }
    }
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
