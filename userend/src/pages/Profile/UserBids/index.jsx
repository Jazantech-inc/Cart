import React, {useEffect, useState} from 'react'
import { Modal, Table, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { FetchAllBids } from '../../../apicall/products';
import { SetLoader } from '../../../redux/loadersSlice';
import moment from 'moment'
const Bids = () => {
   const [bidsData, setBidsData] = useState([]);
   const dispatch = useDispatch();
   const {user} = useSelector((state) => state.users )
   const fetchData = async () => {
    try{
        dispatch(SetLoader(true));
        const response = await FetchAllBids({
           buyer: user._id,
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
        title: "Product",
        dataIndex: "product",
        render: (text, record) => {
              return record.product.title
        },
    },  
    {
        title: "Bid Placed On",
        dataIndex: "createdAt",
        render: (text, record) => {
             return moment(text).format("MMM DD YYYY, h:mm a");
        }    
      }
      ,
      {
        title: "Seller",
        dataIndex: "seller",
        render: (text, record) => {
             return record.seller.name
        }
      },
      {
        title: "Offered Price",
        dataIndex: "offeredPrice",
        render: (text, record) => {
             return record.product.price
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
           fetchData();  
  }, [])

  return (
    <div>
        
           <div className="flex flex-col gap-3">
                    <h1 className='text-xl text-primary'>Bids </h1> 
                    <Table columns={columns} dataSource={bidsData} />
           </div>
        </div>
  )
}

export default Bids