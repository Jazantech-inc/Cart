import React, { useState, useRef, useEffect } from 'react'
import { Modal, Tabs, Form, Input, Select, Row, Col, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
//import { Option } from 'antd/es/mentions'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { SetLoader } from "../../../redux/loadersSlice"
import { AddProduct, UpdateProduct } from "../../../apicall/products"
import Images from './Images';
const additionalThings = [
  {
    label: "Warranty Available",
    name: "warrantyAvailable"
  },
  {
    label: "Bill Available",
    name: "billAvailable"
  },
  {
    label: "Box Available",
    name: "boxAvailable"
  },
  {
    label: "Accessories Available",
    name: "accessoriesAvailable"
  },
];
const rules = [
  {
    required: true,
    message: "Required"
  }
];
function ProductsForm({
  showProductForm,
  setShowProductForm,
  selectedProduct,
  fetchData
}) {
  const [selectedTab = "1", setSelectedTab] = useState("1")
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.users)
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      let response = null
      if (selectedProduct) {
        response = await UpdateProduct(selectedProduct._id, values)
      } else {
        values.seller = user._id;
        values.status = "pending";
        response = await AddProduct(values);
      }
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        fetchData();
        setShowProductForm(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  }
  const formRef = useRef(null);

  useEffect(() => {
    if (selectedProduct) {
      formRef.current.setFieldsValue(selectedProduct)
    }
  }, [selectedProduct])

  return (
    <Modal
      title={selectedProduct ? "Update Product" : "Add Product"}
      open={showProductForm}
      onCancel={() => setShowProductForm(false)}
      centered
      width={1000}
      okText="Save Product"
      onOk={() => {
        formRef.current.submit();
      }}
      {...(selectedTab==="2" && {footer: false})}
    >
      <div>
        <h1 className="text-primary text-2xl text-center font-semibolf uppercase">
          {selectedProduct ? "Update Product" : "Add Product"}
        </h1>
        <Tabs defaultActiveKey='1'
          activeKey={selectedTab}
          onChange={(key) => setSelectedTab(key)} 
        >
          <items tab="General" key="1">
            <Form
              layout="vertical"
              ref={formRef}
              onFinish={onFinish}
            >
              <Form.Item label="Title" name="title" rules={rules}>
                <Input type="text" />
              </Form.Item>
              <Form.Item label="Description" name="description" rules={rules}>
                <TextArea type="text" />
              </Form.Item>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Form.Item label="Price" name="price" rules={rules}>
                    <Input type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Year" name="year" rules={rules}>
                    <Input type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Category" name="category" rules={rules}>
                    <Select dropdownStyle={{ backgroundColor: 'crimson' }} name="category">
                      <Select.Option value="">Select</Select.Option>
                      <Select.Option value="electronics">Electronics</Select.Option>
                      <Select.Option value="garments">Garments</Select.Option>
                      <Select.Option value="sports">Sports</Select.Option>
                      <Select.Option value="home">Home</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex gap-10">
                {additionalThings.map((item) => {
                  return <Form.Item
                    label={item.label}
                    name={item.name}
                    valuePropName="checked"
                  >
                    <Input type="checkbox"
                      value={item.name}
                      onChange={(e) => {
                        formRef.current.setFieldsValue({
                          [item.name]: e.target.checked,
                        });
                      }}
                      checked={formRef.current?.getFieldValue(item.name)}
                    />
                  </Form.Item>
                })}
              </div>
              <Form.Item
                    label="Show Bids on Product Page"
                    name="showBidsOnProductPage"
                    valuePropName="checked"
                  >
                    <Input type="checkbox"
                          style={{ width: 50, marginLeft: 40}}
                      onChange={(e) => {
                        formRef.current.setFieldsValue({
                          showBidsOnProductPage: e.target.checked,
                        });
                      }}
                      checked={formRef.current?.getFieldValue(
                        "ShowBidsOnProductPage"
                      )}
                    />
                  </Form.Item> 


            </Form>
          </items>
          <items tab="Images" key="2"disabled={!selectedProduct}>
            <Images selectedProduct={selectedProduct} 
                    fetchData={fetchData} 
                    setShowProductForm={setShowProductForm} />
          </items>
        </Tabs>
      </div>
    </Modal>
  )
}

export default ProductsForm
