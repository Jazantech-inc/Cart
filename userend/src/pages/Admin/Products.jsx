import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {SetLoader} from "../../redux/loadersSlice" 
import {ChangeProductStatus, FetchProducts} from "../../apicall/products" 
import {Button, message, Table} from "antd"
import moment from "moment"

function Products() {
  const [products, setProducts] = useState([])
  const dispatch = useDispatch()
  
  const fetchData = async () => {
     try{
         dispatch(SetLoader(true));
         const response = await FetchProducts();
         dispatch(SetLoader(false));
         if(response.success){
            setProducts(response.data)
         }
     } catch (error){
         dispatch(SetLoader(false))
         message.error(error.message)
     }   
   }

   const onStatusChange = async (id, status) => {
        try{ 
            dispatch(SetLoader(true));
            const response = await ChangeProductStatus(id, status);
            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
                fetchData();
            } else {
                throw new Error(response.message);
            }
        } catch (error){
            dispatch(SetLoader(false))
            message.error(error.message)
         }    
   };

  const columns = [
    {
      title:"Product Image",
      dataIndex: "image",
      render: (text, record) => {
        return (
        <img   
        src={record?.images?.length > 0 ? record.images[0] : ""}
        alt=""
        className="w-20 h-20 object-cover rounded-md" 
        />
        )
      }
    },
    {
      title: "Product",
      dataIndex: "title"
    },
    {
      title: "Seller",
      dataIndex: "name",
      render: (text,record) => {
        return record.seller.name
      }
    },
    {
      title: "Price",
      dataIndex: "price"
    },
    {
      title: "Category",
      dataIndex: "category"
    },
    {
      title: "Year",
      dataIndex: "year"
    },
    {
      title: "Added On",
      dataIndex: "CreatedAt",
      render: (data, record) => moment(record.createdAt).format("DD/MM/YYYY hh:mm:ss A")  
    },
    {
      title: "Status",
      dataIndex: "status",
       render: (text, record) => {
          return record.status.toUpperCase();
       }
    },
    {
       title: "Action",
       dataIndex: "action",
       render: (text, record) => {
          const { status, _id} = record;
          return(
             <div className="flex gap-5">
              {
                status === "pending" && <span className='underline cursor-pointer'
                onClick={() => onStatusChange(_id, "approved")}>Approve</span>
              }
              {
                status === "pending" && <span className='underline cursor-pointer'
                onClick={() => onStatusChange(_id, "rejected")}>Reject</span>
              }
              {
                status === "approved" && <span className='underline cursor-pointer'
                onClick={() => onStatusChange(_id, "blocked")}>Block</span>
              }
              {
                status === "blocked" && <span className='underline cursor-pointer'
                onClick={() => onStatusChange(_id, "approved")}>UnBlock</span>
              }
               </div>
          )
       }
    },
    
  ];

  useEffect(()=> {
    fetchData()
 },[])
  return (
    <div>
      <Table columns={columns} dataSource={products} />
    </div>
  )
}

export default Products
