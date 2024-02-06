import React from 'react';
import { Form, Row, Col, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../api/users';

export default function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {  
      const res = await LoginUser(values)
      if(res.success){
        message.success(res.message)
      }else{
        message.error(res.message)
      }
    } catch (error) {
      message.error(error.message)
    }
  };


  return (
    <div className='bg-primary flex items-center justify-center h-screen'>
    <div className='card w-400 p-2'>
    <div className='flex items-center justify-between'>
    <h1 className='text-2xl'>CASHMATE - LOGIN</h1>
    </div> 
    <hr/>
    <Form layout='vertical' onFinish={onFinish}>
    <Row gutter={16}>

    <Col span={24}>
    <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Please enter a valid email' }]}>
      <Input />
    </Form.Item>
    </Col>
    
   <Col span={24}>
   <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
    <Input.Password />
   </Form.Item>
   </Col>

    <button className='primary-contained-btn w-100' type="submit">Login</button>
    <h1 className='text-sm underline mt-2' onClick={() => navigate("/register")}>Not a Member, Click here to Register</h1>
    </Row>
    </Form>
    </div>
    </div>
  )
}
