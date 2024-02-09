import React, { useEffect, useState } from "react";
import { Table, Tabs, message } from "antd";
import PageTitle from "../components/PageTitle";
import RequestModal from "./RequestModal";
import { GetAllRequestsByUser, UpdateRequestStatus } from "../api/request";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment"; //used for get time and date
import { ReloadUser } from "../redux/userSlice";

const { TabPane } = Tabs;

export default function Requests() {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const [showRequestModal, setShowRequestModal] = React.useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);


  const getData = async () => {
    try {
      //dispatch(ShowLoading())
      const res = await GetAllRequestsByUser();
      if (res.success) {
        const sendData = res.data.filter(
          (item) => item.sender._id === user._id
        );
        const receivedData = res.data.filter(
          (item) => item.receiver._id === user._id
        );

        setData({
          sent: sendData,
          received: receivedData,
        });
      }
      //dispatch(HideLoading())
    } catch (error) {
      //dispatch(HideLoading())
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const updateStatus = async (record, status) => {
    try {
      if (status === "Accepted" && record.amount > user.balance) {
        message.error("Insufficient Money");
        return;
      } else {
        //dispatch(ShowLoading())
        const res = await UpdateRequestStatus({
          ...record,
          status,
        });
        //dispatch(HideLoading())
        if (res.success) {
          message.success(res.message);
          getData();
          dispatch(ReloadUser(true));
        } else {
          message.error(res.message);
        }
      }
    } catch (error) {
      //dispatch(HideLoading())
      message.error.apply(error.message);
    }
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };


  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render(text, record) {
        return moment(record.createdAt).format("DD/MM/YYYY hh:mm A");
      },
    },
    {
      title: "Request Id",
      dataIndex: "_id",
    },
    {
      title: "Sender",
      dataIndex: "sender",
      render(sender) {
        return sender.firstName + " " + sender.lastName;
      },
    },
    {
      title: "Receiver",
      dataIndex: "receiver",
      render(receiver) {
        return receiver.firstName + " " + receiver.lastName;
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        if (record.status === "Pending" && record.receiver._id === user._id) {
          return (
            <div className="flex gap-1">
              <h1
                className="text-sm underline"
                onClick={() => updateStatus(record, "Accepted")}
              >
                Accept
              </h1>
              <h1
                className="text-sm underline"
                onClick={() => updateStatus(record, "Rejected")}
              >
                Reject
              </h1>
            </div>
          );
        }
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Requests" />
        <button
          className="primary-outlined-btn"
          onClick={() => setShowRequestModal(true)}
        >
          Request Money
        </button>
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Sent" key="1">
          <Table columns={columns} dataSource={data.sent} />
        </TabPane>
        <TabPane tab="Received" key="2">
          <Table columns={columns} dataSource={data.received} 
          pagination={{ 
            pageSize: pageSize,
            total: data.length,
            onChange: handlePageChange,
            current: currentPage,
          }}
          />
        </TabPane>
      </Tabs>
      {showRequestModal && (
        <RequestModal
          showRequestModal={showRequestModal}
          setShowRequestModal={setShowRequestModal}
          reloadData={getData}
        />
      )}
    </div>
  );
}
