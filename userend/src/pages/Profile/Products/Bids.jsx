import React, {useEffect, useState} from 'react'
import { Modal, Table, message } from 'antd'
import { useDispatch } from 'react-redux';
import { FetchAllBids } from '../../../apicall/products';
import { SetLoader } from '../../../redux/loadersSlice';
import moment from 'moment'
import  Divider  from '../../../components/Divider'
const Bids = ({ showBidsModal, setShowBidModal, selectedProduct}) => {
   const [bidsData, setBidsData] = useState([]);
   const dispatch = useDispatch();
   const fetchData = async () => {
    try{
        dispatch(SetLoader(true));
        const response = await FetchAllBids({
           product: selectedProduct._id
        });
        dispatch(SetLoader(false));
        if(response.success){
           setBidsData(response.data)
        }
    } catch (error){
        dispatch(SetLoader(false))
        message.error(error.message)
    }   
  } 
  const columns = [
      {
        title: "Bid Placed On",
        dataIndex: "createdAt",
        render: (text, record) => {
             return moment(text).format("MMM DD YYYY, h:mm a");
        }    
      }
      ,
      {
        title: "Name",
        dataIndex: "title",
        render: (text, record) => {
             return record.buyer.name
        }
      },
      {
        title: "Bid Amount",
        dataIndex: "bidAmount"
      },
      {
        title: "Message",
        dataIndex: "message",
      },
      {
        title: 'Contact Details',
        dataIndex: "contactDetails",
        render: (text, record) => {
            return (
                <div>
                    <p><b>Phone: </b>{record.mobile}</p>
                    <p><b>Email: </b>{record.buyer.email}</p>
                </div>
            );
       },
      },
  ] ;

  useEffect(() => {
       if(selectedProduct){
           fetchData();
       }
  }, [selectedProduct])

  return (
    <Modal 
        title="Bids"
        open={showBidsModal}
        onCancel={() => setShowBidModal(false)}
        centered
        width={1500}
        footer={null}
        >
           <div className="flex flex-col gap-3">
                <Divider />
                    <h1 className='text-xl text-primary'>Product Name: {selectedProduct.title}</h1>

                    <Table columns={columns} dataSource={bidsData} />
           </div>
        </Modal>
  )
}

export default Bids