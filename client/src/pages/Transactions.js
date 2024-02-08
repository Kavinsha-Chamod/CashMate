import React from "react";
import PageTitle from "../components/PageTitle";
import {Table} from "antd"
export default function Transactions() {
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
          <button className="primary-contained-btn">Transfer</button>
        </div>
      </div>
      <Table columns={columns} dataSource={[]} className="mt-2"/>
    </div>
  );
}
