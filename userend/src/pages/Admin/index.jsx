
import { Tabs } from 'antd'
import Products from './Products'
import Users from './Users'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import React, {useEffect} from 'react'

function Admin() {

     const redirectUser = useNavigate();
     const { user } = useSelector((state) => state.users);
     useEffect(() => {
     
        if (user.role !== 'admin') {
          redirectUser('/')	
        }
     }, []);
     
  return (
    <div> Admin area
         <Tabs defaultActiveKey='1'>
              <items tab="Products" key="1">
                   <Products />
              </items>
              <items tab="Users" key="2">
                   <Users />
              </items>
         </Tabs>     
        
         </div>
  )
}

export default Admin
