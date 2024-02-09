import React from 'react';
import { Modal, Form, message } from 'antd';
import StripeCheckout from 'react-stripe-checkout';
import { DepositFunds } from '../api/transaction';
import {useDispatch} from 'react-redux';


export default function DepositModal({ showDepositModal, setShowDepositModal, reloadData }) {

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onToken = async(token) =>{
    try {
      //dispatch(ShowLoading());
      const res = await DepositFunds({token, amount:form.getFieldValue("amount")})
      //dispatch(HideLoading());
      if(res.success){
        reloadData();
        setShowDepositModal(false)
        message.success(res.message)
      }else{
        message.error(res.message)
      }
    } catch (error) {
      //dispatch(HideLoading());
      message.error(error.message)
    }
  }


  return (
    <Modal
      title="Deposit Money"
      visible={showDepositModal}
      onCancel={() => setShowDepositModal(false)}
      footer={null}
    >
      <div className='flex flex-col gap-1'>
        <Form layout='vertical' form={form}>
        <Form.Item label="Amount" name='amount' rules={[{ required: true, message:'Please input the amount'}]}>
          <input type="number"/>
        </Form.Item>
        <div className='flex justify-end gap-1'>
        <StripeCheckout token={onToken} currency='LKR' amount={Math.round(form.getFieldValue("amount") * 100)}  shippingAddress stripeKey="pk_test_51OhpGBBfZaAi9d7acbEaTLlA141mfqkC4loZ1db9U6XpNzDyiMm2Gnzd5N2SyBm5bJqIP8k3N2JuTtFkESboJri800YFYfxQZp">
        <button className='primary-contained-btn'>Deposit</button>
        </StripeCheckout>
        <button className='primary-outlined-btn'>Cancel</button>
        </div>
        </Form>
      </div>
    </Modal>
  );
}
