import React from 'react'
import {Modal, Form} from 'antd'
import {useDispatch} from 'react-redux'
import { VerifyAccount } from '../api/transaction'
//import { ShowLoading, HideLoading } from '../redux/loaderSlice'

  export default function TransferFundsModal({  showTransferModal, setShowTransferModal, reloadData}) {

    const [isVerified, setIsVerified] = React.useState('')
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const verifyAccount = async()=>{
    try {
      //dispatch(ShowLoading())
      const receiverValue = form.getFieldValue("receiver");
      console.log("Receiver Value:", receiverValue);
      const res = await VerifyAccount({
        receiver: receiverValue,
      })
      console.log("Server Response:", res);
      if(res.success){
        setIsVerified('true')
      }else{
        setIsVerified('false')
      }
    } catch (error) {
      //dispatch(HideLoading())
      setIsVerified('false')
    }
    }


  return (
    
    <div>
    <Modal 
       title="Transfer Money"
       visible={showTransferModal}
       onCancel={()=> setShowTransferModal(false)}
       footer={null}
    >
      <Form layout='vertical' form={form}>
       <div className='flex gap-2 items-center'>
       <Form.Item label="Account Number" name="receiver" className='w-100'>
           <input type="text"/>
       </Form.Item>
       <button className='primary-contained-btn mt-1' type='button' onClick={verifyAccount}>VERIFY</button>
       </div>
       {isVerified ==='true' && (<div className='success-bg'>
         Account verified successfully
        </div>)}

        {isVerified ==='false' && (<div className='error-bg'>
         Invalid Account
        </div>)}

        <Form.Item label="Amount" name="amount">
           <input type="text"/>
       </Form.Item>
       <Form.Item label="Description" name="description">
           <textarea type="text"/>
       </Form.Item>
        <div className='flex justify-end gap-1'>
        <button className='primary-contained-btn'>Transfer</button>
        <button className='primary-outlined-btn'>Cancel</button>

        </div>
      </Form>
    
    </Modal>
    </div>
  )
}
