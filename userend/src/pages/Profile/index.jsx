import React from 'react'
import { Tabs } from 'antd'
import Products from "./Products/index"
import UserBids from "./UserBids"
import { useSelector } from 'react-redux';
import moment from "moment"
function Profile() {
     const {user} = useSelector((state) => state.users )
  return (
    <div>
         <Tabs defaultActiveKey='1'>
              <items tab="Products" key="1">
                   <Products />
              </items>
              <items tab="My Bids" key="2">
                   <UserBids />
              </items>
              <items tab="Generals" key="3">
                   <div className="flex flex-col w-1/3">
                         <span className="text-xl text-primary justify-between">
                               Name: <span className="text-xl text-gray">
                                   {user.name}
                               </span>
                         </span>
                         <span className="text-xl text-primary justify-between">
                               Email: <span className="text-xl text-gray">
                                   {user.email}
                               </span>
                         </span>
                         <span className="text-xl text-primary justify-between">
                               Date Of Account: <span className="text-xl text-gray">
                                   {moment(user.createdAt).format("MMM D, YYYY hh:mm A")}
                               </span>
                         </span>
                   </div>                  
              </items>
         </Tabs>
    </div>
  )
}

export default Profile
