import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { SetLoader } from "../../redux/loadersSlice";
import { FetchProducts } from "../../apicall/products";
import Divider from "../../components/Divider";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";
import moment from "moment";

function Home() {
  const [showFilters, setShowFilters] = useState(true);
  const [products, setProducts] = useState([]);
  const [filters, setfilters] = useState({
    status: "approved",
    category: [],
    year: []
  });
  const productNavigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const fetchData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await FetchProducts(filters);
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
     fetchData();
  }, [filters]);

  return (
    <div className="flex gap-5">
      {showFilters &&
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          setFilters={setfilters}
        />}
      <div className="flex flex-col gap-5 w-full">
        <div className="flex gap-5 items-center">
          {!showFilters &&  <i className="ri-equalizer-line text-xl text-orange-900 cursor-pointer"
          onClick={()=> setShowFilters(!showFilters)}></i>}
           <input 
              type="text"
              placeholder="Search Products here ...."
              className="border border-red-700 rounded border-solid px-2 py-1 w-full" 
           />
        </div>
        <div className={
          `grid gap-5 ${showFilters ? 'grid-cols-4' : 'grid-cols-5'}`
        }>
          {products?.map((product) => {
            return (
              <div
                className="border border-red-400 rounded border-solid flex flex-col gap-1 pb-2 cursor-pointer"
                key={product._id}
                onClick={() => productNavigate(`/products/${product._id}`)}
              >
                <img
                  src={product.images[0]}
                  className="w-full py-2 h-40 object-cover"
                  alt=""
                />
                <div className="px-2 flex flex-col">
                  <h1 className="text-lg font-semibold text-primary-800">
                    {product.title}
                  </h1>
                  <p className="text-sm">
                  {product.year} {" "}
                  {product.year === 1 ? "year" : "years"} old
                  </p>
                  <Divider />
                  <span className="font-semibold text-orange-800">
                    {product.price} Rupees
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

  );
}
export default Home;
