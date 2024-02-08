import React from "react";
import PageTitle from "../components/PageTitle";
import {Table} from "antd"
import TransferFundsModal from "./TransferFundsModal";
export default function Transactions() {
  const [showTransferFundsModal, setShowTransferFundsModal] = React.useState(false)
  const handleOpenModal = () => {
    setShowTransferFundsModal(true);
  };
  //antd table formate is this
  const columns = [
    {
      title:"Date",
      dataIndex: "date",
    },{
      title:"Transaction Id",
      dataIndex: "transactionId",
    },{
      title:"Amount",
      dataIndex: "amount",
    },{
      title:"Type",
      dataIndex: "type",
    },{
      title:"Reference",
      dataIndex: "reference",
    },{
      title:"Status",
      dataIndex: "status",
    },
  ]
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Transactions" />
        <div className="flex gap-1">
          <button className="primary-outlined-btn">Deposit</button>
          <button className="primary-contained-btn" onClick={handleOpenModal}>Transfer</button>
        </div>
      </div>
      <Table columns={columns} dataSource={[]} className="mt-2" />
      {showTransferFundsModal && (
        <TransferFundsModal
          showTransferModal={showTransferFundsModal} // Correct prop name
          setShowTransferModal={setShowTransferFundsModal} // Correct prop name
        />
      )}
    </div>
  );
}
