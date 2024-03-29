import React from 'react'
import {Modal, Form, message} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import { VerifyAccount, TransferFunds } from '../api/transaction'
import { ReloadUser } from '../redux/userSlice'
//import { ShowLoading, HideLoading } from '../redux/loaderSlice'

  export default function TransferFundsModal({  showTransferModal, setShowTransferModal, reloadData}) {

    const {user} = useSelector(state => state.users)
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
    
    const onFinish= async(values)=>{
      try {
        //dispatch(ShowLoading());
        const payload ={
          ...values,
          sender: user._id,
          description: values.description || "No description",
          status: "Success",
        }
        const res = await TransferFunds(payload)
        if(res.success){
          reloadData();
          //setShowTransferFundsModal(false)
          message.success(res.message);
          setShowTransferModal(false);
          dispatch(ReloadUser(true))
        }else{
          message.error(res.message);
        }
        //dispatch(HideLoading());
      } catch (error) {
        //dispatch(HideLoading());
        message.error(error.message)
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
      <Form layout='vertical' form={form}
      onFinish={onFinish}
      >
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

        <Form.Item label="Amount" name="amount"
        rules={[
          {
            required:true,
            message: "Please input your amount!"
          },{
            max: user.balance,
            message: "Insfficient Balance",
          }
        ]}>
           <input type="number" max={user.balance}/>
       </Form.Item>
       <Form.Item label="Description" name="description">
           <textarea type="text"/>
       </Form.Item>
        <div className='flex justify-end gap-1'>
        {isVerified ==='true' &&  <button className='primary-contained-btn'>Transfer</button> }
        <button className='primary-outlined-btn'onClick={()=>setShowTransferModal(false)}>Cancel</button>

        </div>
      </Form>
    
    </Modal>
    </div>
  )
}
