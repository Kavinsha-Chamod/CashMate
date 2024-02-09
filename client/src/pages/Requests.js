import React, { useEffect } from 'react'
import {Tabs, message} from 'antd'
import PageTitle from '../components/PageTitle';
import RequestModal from './RequestModal';
import { GetAllRequestsByUser } from '../api/request';
import { useDispatch } from 'react-redux';

const {TabPane} = Tabs;

export default function Requests() {
  
  const dispatch = useDispatch();
  const [data, setData] = React.useState([])
  const [showRequestModal, setShowRequestModal] = React.useState(false)

  const columns =[
  {
    title:"Request Id",
    dataIndex: "_id",
  },{
    title:"User",
    dataIndex: "user",
  },{
    title:"Amount",
    dataIndex: "amount", 
  },
  {
    title:"Date",
    dataIndex: "date" 
  },{
    title:"Status",
    dataIndex: "status" 
  },
  ]

  const getData = async () =>{
    try {
     //dispatch(ShowLoading())
     const res = await GetAllRequestsByUser()
     if(res.success){
       setData(res.data)
     }
     //dispatch(HideLoading())
    } catch (error) {
     //dispatch(HideLoading())
     message.error(error.message)
    }
   }
 
   useEffect(()=>{
     getData();
   },[])


  return (
    <div>
    <div className='flex justify-between'>
    <PageTitle title="Requests" />
    <button className='primary-outlined-btn' onClick={()=> setShowRequestModal(true)}>Request Money</button>
    </div>
    <Tabs defaultActiveKey="1">
      <TabPane tab="Sent" key="1">Sent</TabPane>
      <TabPane tab="Received" key="2">Received</TabPane>
    </Tabs>
    {showRequestModal && (
      <RequestModal 
        showRequestModal={showRequestModal}
        setShowRequestModal={setShowRequestModal}
        />
    )}
    </div>
  )
}
