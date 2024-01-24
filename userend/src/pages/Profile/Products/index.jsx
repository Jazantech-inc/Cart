import React, { useState, useEffect } from "react";
import ProductsForm from "./ProductsForm";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../../redux/loadersSlice";
import { FetchProducts, DeleteProduct } from "../../../apicall/products";
import { Button, message, Table } from "antd";
import moment from "moment";
import Bids from "./Bids";

function Products() {
  const [showBids, setshowBids] = useState(false);
  const [bids, setBids] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await FetchProducts({
        seller: user._id,
      });
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteProduct(id);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        fetchData();
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Product Image",
      dataIndex: "image",
      render: (text, record) => {
        return (
          <img
            src={record?.images?.length > 0 ? record.images[0] : ""}
            alt=""
            className="w-20 h-20 object-cover rounded-md"
          />
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Year",
      dataIndex: "year",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Added On",
      dataIndex: "CreatedAt",
      render: (data, record) =>
        moment(record.createAt).format("DD/MM/YYYY hh:mm:ss A"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-5 items-center">
            <i
              className="ri-pencil-line purple"
              onClick={() => {
                setSelectedProduct(record);
                setShowProductForm(true);
              }}
            ></i>
            <i
              className="ri-delete-bin-line red"
              onClick={() => {
                deleteProduct(record._id);
              }}
            ></i>
            <span
              className="underline cursor-pointer"
              onClick={() => {
                setSelectedProduct(record);
                setshowBids(true);
              }}
            >
              Show Bids
            </span>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          type="default"
          onClick={() => {
            setSelectedProduct(null);
            setShowProductForm(true);
          }}
        >
          Add New Product
        </Button>
      </div>
      <Table columns={columns} dataSource={products} />
      {showProductForm && (
        <ProductsForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
          selectedProduct={selectedProduct}
          fetchData={fetchData}
        />
      )}

      {showBids && (
        <Bids
          showBidsModal={showBids}
          setShowBidModal={setshowBids}
          selectedProduct={selectedProduct}
        />
      )}
    </div>
  );
}

export default Products;
