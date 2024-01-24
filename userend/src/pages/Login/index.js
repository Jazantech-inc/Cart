import {Form, Input, Button, message} from "antd"
import {Link, useNavigate} from "react-router-dom"
import Divider from "../../components/Divider" 
import { LoginUser } from "../../apicall/users";
import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";

const rules = [
    {
       required: true,
       message : "field required"
    },
];
function Login (){
    const redirectUser = useNavigate();
    const loaderDispatch = useDispatch();
    const onFinish = async (values) => {
        try{
          loaderDispatch(SetLoader(true));
          const response = await LoginUser(values)
          loaderDispatch(SetLoader(false));
          if(response.success){
             message.success(response.message)
             localStorage.setItem("token",response.data)
             window.location.href = "/";
          }
          else {
            throw new Error(response.message)   
          }
        } catch (error) {
           loaderDispatch(SetLoader(false));
           message.error(error.message)
        } 
    };
    useEffect(() => {
      if(localStorage.getItem("token")){
        redirectUser("/");
        //window.location.href = "/";
      }
    });
    return (
          <div className="h-screen bg-primary flex justify-center items-center"> 
               <div className="bg-white p-4 rounded w-[475px]">
                    <h1 className="text-primary py-4 text-center text-2xl">
                         FlipCart | <span className="text-orange-500 text-2xl"> Market Place</span>
                            <br />Login
                    </h1>
                    <Divider />
                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item label="Email" name="email" rules={rules}>
                               <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item label="Password" name="password" rules={rules}>
                               <Input placeholder="Password" />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" block className="mt-3"> Login </Button>
                        <div className="mt-5 text-center">
                            <span className="text-orange-700">
                            Don’t have an account? <Link className="text-primary" to="/signup"> 
                              Signup
                              </Link>
                            </span>
                        </div>
                    </Form>
               </div>
         </div>
    )

}

export default Login