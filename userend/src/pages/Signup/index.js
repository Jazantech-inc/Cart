import {Form, Input, Button, message} from "antd"
import {Link, useNavigate} from "react-router-dom"
import Divider from "../../components/Divider" 
import { SignupUser } from "../../apicall/users"
import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";

const rules = [
    {
       required: true,
       message : "field required"
    }
]
function Signup (){
    const redirectUser = useNavigate();
    const loaderDispatch = useDispatch(); 
    const onFinish = async (values) => {
            try{
                loaderDispatch(SetLoader(true));
                const response = await SignupUser(values);
                loaderDispatch(SetLoader(false));
                if (response.success){
                    redirectUser("/login");
                    message.success(response.message);    
                }
                else {
                    throw new Error(response.message);
                }  
            } catch(error){
                loaderDispatch(SetLoader(false));
                message.error(error.message);         
            }
    };
    useEffect(() => {
        if(localStorage.getItem("token")){
            redirectUser("/");
            // window.location.href = "/";
        }
      });
    return (
          <div className="h-screen bg-primary flex justify-center items-center"> 
               <div className="bg-white p-4 rounded w-[475px]">
                    <h1 className="text-primary py-4 text-center text-2xl">
                         FlipCart | <span className="text-orange-500 text-2xl"> Market Place</span>
                         <br />Signup
                    </h1>
                    <Divider />
                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item label="Name" name="name" rules={rules}>
                               <Input placeholder="Name" />
                        </Form.Item>
                        <Form.Item label="Email" name="email" rules={rules}>
                               <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item label="Password" name="password" rules={rules}>
                               <Input placeholder="Password" />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" block className="mt-3"> Signup </Button>
                        <div className="mt-5 text-center">
                            <span className="text-orange-700">
                              Already have an Accunt? <Link className="text-primary" to="/login"> 
                              Login
                              </Link>
                            </span>
                        </div>
                    </Form>
               </div>
         </div>
    )

}

export default Signup