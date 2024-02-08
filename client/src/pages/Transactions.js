import React, { useEffect } from "react";
import PageTitle from "../components/PageTitle";
import {Table, message} from "antd"
import TransferFundsModal from "./TransferFundsModal";
import { useDispatch, useSelector } from "react-redux";
import { GetTransactionsOfUser } from "../api/transaction";
import moment from 'moment' //used for get time and date


export default function Transactions() {
  const [showTransferFundsModal, setShowTransferFundsModal] = React.useState(false)
  const [data=[],setData] = React.useState([]);
  const handleOpenModal = () => {
    setShowTransferFundsModal(true);
  };
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.users)

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
        return record.sender._id === user._id ? "Debit" : "Credit"
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
      title:"Reference",
      dataIndex: "reference",
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


  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Transactions" />
        <div className="flex gap-1">
          <button className="primary-outlined-btn">Deposit</button>
          <button className="primary-contained-btn" onClick={handleOpenModal}>Transfer</button>
        </div>
      </div>
      <Table columns={columns} dataSource={data} className="mt-2" />
      {showTransferFundsModal && (
        <TransferFundsModal
          showTransferModal={showTransferFundsModal} // Correct prop name
          setShowTransferModal={setShowTransferFundsModal} // Correct prop name
        />
      )}
    </div>
  );
}
