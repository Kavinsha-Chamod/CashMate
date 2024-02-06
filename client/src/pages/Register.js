import React from 'react';
import { Form, Row, Col, Input, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RegisterUser } from '../api/users';
const {Option} = Select;

export default function Register() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {  
      const res = await RegisterUser(values)
      if(res.success){
        message.success(res.message)
        navigate("/login")
      }else{
        message.error(res.message)
      }
    } catch (error) {
      message.error(error.message)
    }
  };

  return (
      <div className='m-5'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl'>CASHMATE - REGISTER</h1>
          <h1 className='text-sm underline' onClick={() => navigate("/login")}>Already a Member, Login</h1>
        </div>
        <hr />
        <Form layout='vertical' onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'Please enter your first name' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Please enter your last name' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Please enter a valid email' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Mobile" name="phoneNumber" rules={[{ required: true, message: 'Please enter your mobile number' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Identification Type" name="identificationType" rules={[{ required: true, message: 'Please select your identification type' }]}>
                <Select>
                  <Option value="NATIONAL ID">National ID</Option>
                  <Option value="PASSPORT">Passport</Option>
                  <Option value="DRIVING LICENSE">Driving License</Option>
                  <Option value="SOCIAL CARD">Social Card</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Identification Number" name="identificationNumber" rules={[{ required: true, message: 'Please enter your identification number' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please enter your address' }]}>
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Confirm Password" name="confirmPassword" rules={[{ required: true, message: 'Please confirm your password' }]}>
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>
          <div className='flex justify-end'>
            <button className='primary-contained-btn' type="primary" htmlType="submit">Register</button>
          </div>
        </Form>
      </div>
    );
  }