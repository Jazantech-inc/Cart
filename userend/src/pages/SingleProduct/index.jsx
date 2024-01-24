import React, { useState, useEffect } from "react";
import { SetLoader } from "../../redux/loadersSlice";
import { FetchAllBids, FetchProductById } from "../../apicall/products";
import Divider from "../../components/Divider";
import { useDispatch, useSelector } from "react-redux";
import { Button, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import BidModal from "./BidModel";

function SingleProduct() {
  const {user} = useSelector((state) => state.users);
  const [showAddNewBid,setShowAddNewBid] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [product, setProduct] = useState(null);
  const productNavigate = useNavigate();
  const {id} = useParams();
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await FetchProductById(id);
      dispatch(SetLoader(false));
      if (response.success) {
        const bidsResponse = await FetchAllBids({product: id});
        setProduct({
          ...response.data,
          bids: bidsResponse.data,
        });
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    product && (
     <div> 
      <div className="grid grid-cols-2 gap-5 mt-5">
        {/* Images */}
        <div className="flex flex-col gap-2">
            <img 
                src={product.images[selectedImageIndex]}
                alt=""
                className="w-full h-96 border-red-300 border-dotted p-1 object-cover rounded-md"
                />

             <div className="flex gap-5">
              {product.images.map((image, index) => {
                 return (
                   <img 
                     src={image}
                     alt=""
                     className={
                      "w-20 h-20 object-cover rounded-md cursor-pointer " + (selectedImageIndex === index
                        ? "border-2 border-red-600 border-dashed p-2"
                        : "")
                     }
                     onClick={()=> setSelectedImageIndex(index)}
                   />
                 )
              })}
              </div>  
              
              <Divider />
              {/* date of posted product */}
              <div>
                    <h1 className="text-blue-700">
                        Posted Date & Time
                    </h1>
                    <span lassName="text-blue-700">
                        {moment(product.createdAt).format("MMM D, YYYY hh:mm A")} 
                    </span>  
              </div>

        </div>

       
         {/* details */}
         <div className="mx-4 flex flex-col gap-3">
             <div>
                <h1 class="text-2xl font-semibold text-orange-900">{product.title}</h1>
                <span>
                     {product.description}
                </span>
             </div>    
             <Divider />
             <div className="flex flex-col">
             <h1 className="text-2xl font-semibold text-orange-900">Product Deails</h1>

              <div className="flex justify-between mt-2">
                  <span className="text-1xl font-semibold text-red-500">Price</span>
                  <span>{product.price} rupees</span>
              </div>

               <div className="flex justify-between mt-2">
                  <span className="text-1xl font-semibold text-red-500">Category</span>
                  <span>{product.category}</span>
              </div>

              {/* <div className="flex justify-between mt-2">
                  <span className="text-1xl font-semibold text-red-500">Years Old</span>
                  <span>{product.year}</span>
              </div> */}

              <div className="flex justify-between mt-2">
                  <span className="text-1xl font-semibold text-red-500">Box Available</span>
                  <span>{product.boxAvailable ? <span className='text-green-500'> Available </span> 
                                              : <span className='text-red-800'>Not Available </span> 
                 }</span>
              </div>

              <div className="flex justify-between mt-2">
                  <span className="text-1xl font-semibold text-red-500">Bill Available</span>
                  <span>{product.billAvailable ? <span className='text-green-500'> Available </span> 
                                              : <span className='text-red-800'>Not Available </span> 
                 }</span>
              </div>

              <div className="flex justify-between mt-2">
                  <span className="text-1xl font-semibold text-red-500">Warranty Available</span>
                  <span>{product.warrantyAvailable ? <span className='text-green-500'> Available </span> 
                                              : <span className='text-red-800'>Not Available </span> 
                 }</span>
              </div>

               <div className="flex justify-between mt-2">
                  <span className="text-1xl font-semibold text-red-500">Accessories Available</span>
                  <span>{product.acessoriesAvailable ? <span className='text-green-500'> Available </span> 
                                              : <span className='text-red-800'>Not Available </span> 
                 }</span>
              </div>

              <div className="flex justify-between mt-2">
                  <span className="text-1xl font-semibold text-red-500">Purchase Year </span>
                  <span>
                   {moment().subtract(product.year, "years").format("YYYY")} ({product.year} years old)
                  </span>                                
              </div>

             </div>

             <Divider />
             <div className="flex flex-col">
                <h1 className="text-2xl font-semibold text-orange-900">Seller Deails</h1>

                <div className="flex justify-between mt-2">
                  <span className="text-1xl font-semibold text-red-500">Owner Name</span>
                  <span>{product.seller.name} </span>
              </div>

              <div className="flex justify-between mt-2">
                  <span className="text-1xl font-semibold text-red-500">Owner Email</span>
                  <span>{product.seller.email} </span>
              </div>
             </div>

             <Divider />
             <div className="flex flex-col">
                  <div className="flex justify-between mb-5">
                  <h1 className="text-2xl font-semibold text-orange-900">Bids</h1>
                  <Button
                  onClick={() => setShowAddNewBid(!showAddNewBid)}
                  disabled={user._id === product.seller._id}
                  > 
                    New Bid 
                  </Button>
                  </div>
             </div>
            { product.showBidsOnProductPage &&
              product?.bids?.map((bid) => {
                    return (
                      <div className="border border-red-400 border-solid p-3 rounded mt-2"> 
                        <div className="flex justify-between text-primary text-primary-700">
                            <h4>Name</h4>
                            <span> {bid.buyer.name}</span>
                        </div>
                        <div className="flex justify-between text-primary text-primary-700">
                            <h4>Bid Amount</h4>
                            <span> {bid.bidAmount}</span>
                        </div>
                         <div className="flex justify-between text-primary text-primary-700">
                            <h4>Bid Placed on </h4>
                            <span> {moment(bid.createdAt).format("MM D , YYYY, hh:mm: A")}</span>
                        </div>
                      </div>
                  );
              })
            }  
          </div>     




          {showAddNewBid && (
            <BidModal 
             product={product}
             reloadData={fetchData}
             showBidModal={showAddNewBid}
             setShowBidModal={setShowAddNewBid}
            />
          )}
       </div>
      </div>  
    ) 
  );
}

export default SingleProduct
