import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { GetUserInfo } from '../../src/api/users';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SetUser } from '../redux/userSlice';
import DefaultLayout from './DefaultLayout';

export default function ProtectedRoute(props) {
  const {user} = useSelector(state=>state.users)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await GetUserInfo();
      if (res.success) {
        dispatch(SetUser(res.data));
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
      if (!user) {
        getData();
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    user && <div>
    <DefaultLayout>{props.children}</DefaultLayout>
    </div>
  );
}
