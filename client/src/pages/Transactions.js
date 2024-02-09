import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import {Table, message} from "antd"
import TransferFundsModal from "./TransferFundsModal";
import { useDispatch, useSelector } from "react-redux";
import { GetTransactionsOfUser } from "../api/transaction";
import moment from 'moment' //used for get time and date
import DepositModal from "./DepositModal";


export default function Transactions() {
  const [showTransferFundsModal, setShowTransferFundsModal] = React.useState(false)
  const [data=[],setData] = React.useState([]);
  const handleOpenModal = () => {
    setShowTransferFundsModal(true);
  };
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.users)
  const [showDepositModal, setShowDepositModal] = React.useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  //antd table formate is this
  const columns = [
    {
      title:"Date",
      dataIndex: "date",
      render: (text,record)=>{
        return moment(record.createdAt).format("DD/MM/YYYY  hh:mm A")
      }
    },{
      title:"Transaction Id",
      dataIndex: "_id",
    },{
      title:"Amount",
      dataIndex:"amount",
    },{
      title:"Type",
      dataIndex: "type",
      render: (text,record) =>{
        if(record.sender._id === record.receiver._id){
          return "Deposit"
        }else if (record.sender._id === user._id){
          return "Debit"
        }else{
          return "Credit"
        }
      }
    },{
      title:"Reference Account",
      dataIndex:"",
      render: (text,record) =>{
        return record.sender._id === user._id ? <div>
        <h1 className="text-sm">{record.receiver.firstName} {record.receiver.lastName}</h1>
        </div> : <div>
        <h1 className="text-sm">{record.sender.firstName} {record.sender.lastName}</h1>
        </div>
      }
    },{
      title:"Description",
      dataIndex: "description",
    },{
      title:"Status",
      dataIndex: "status",
    },
  ]

  const getData = async () =>{
   try {
    //dispatch(ShowLoading())
    const res = await GetTransactionsOfUser()
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

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Transactions" />
        <div className="flex gap-1">
          <button className="primary-outlined-btn" onClick={() => setShowDepositModal(true)}>Deposit Money</button>
          <button className="primary-contained-btn" onClick={handleOpenModal}>Transfer Money</button>
        </div>
      </div>
      <Table columns={columns} dataSource={data} className="mt-2" 
      pagination={{ 
        pageSize: pageSize,
        total: data.length,
        onChange: handlePageChange,
        current: currentPage,
      }}
      />
      {showTransferFundsModal && (
        <TransferFundsModal
          showTransferModal={showTransferFundsModal} 
          setShowTransferModal={setShowTransferFundsModal}
          reloadData={getData}
          />
      )}
      {showDepositModal && <DepositModal
        showDepositModal={showDepositModal}
        setShowDepositModal={setShowDepositModal}
        reloadData={getData}
        />}
    </div>
  );
}
