import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { GetUserInfo } from '../../src/api/users';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute(props) {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await GetUserInfo();
      if (res.success) {
        setUserData(res.data);
      } else {
        message.error(res.message);
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
      message.error(error.message);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (!userData) {
        getData();
      }
    } else {
      navigate("/login");
    }
  }, [userData, navigate]);

  return (
    <div>{props.children}</div>
  );
}
