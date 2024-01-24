import React, {useRef} from 'react'
import { Modal, Form, Input, message } from 'antd'
import { useDispatch, useSelector } from "react-redux";
import { PlaceNewBid } from "../../apicall/products";
import { SetLoader } from "../../redux/loadersSlice";
import { AddNotification } from '../../apicall/notifications';


const BidModal = ({showBidModal, setShowBidModal, product, reloadData}) => {
  const { user } = useSelector( (state) => state.users);
  const formRef = useRef(null);
  const rules = [{ required: true, message: "This Field is Mandatory"}];
  const dispatch = useDispatch();
  const onFinish = async (values) => {
      try{
          dispatch(SetLoader(true));
          const response = await PlaceNewBid({
              ...values,
              product: product._id,
              seller: product.seller._id,
              buyer: user._id,
          });
          dispatch(SetLoader(false));
          if(response.success){
             message.success("Bid added successfully!!");

             /* send notification to seller */
             await AddNotification({
                title: "A new Bid has been placed",
                message: `A new bid has been placed on your product "${product.title}" by "${user.name}" for amount "${values.bidAmount}" Rs`,
                user: product.seller._id,
                onClick: '/profile',
                seen: false,
             });
             reloadData();
             setShowBidModal(false);
          } else {
             throw new Error(response.message);
          }
      } catch (error){
        message.success(error.message);
        dispatch(SetLoader(false));
      }
  };
  return (
    <Modal onCancel={() => setShowBidModal(false)} open={showBidModal} centered width={600} 
    onOk={() => formRef.current.submit()} >
        <div className="flex flex-col gap-5 mb-5">
            <h1 className="text-2xl font-semibold text-orange-900 text-center">New Bid</h1>

            <Form layout='vertical' ref={formRef} onFinish={onFinish}>

              <Form.Item name="bidAmount" label="Bid Amount" rules={rules}>
                <Input type="number" min={0} />
              </Form.Item>

              <Form.Item name="mobile" label="Mobile" rules={rules}>
                <Input type="number" />
              </Form.Item>

              <Form.Item name="message" label="Message" rules={rules}>
                <Input.TextArea />
              </Form.Item>
            </Form>
        </div>
    </Modal>
  )
}
export default BidModal