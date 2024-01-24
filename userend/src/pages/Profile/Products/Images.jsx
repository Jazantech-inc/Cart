import React, {useState} from 'react'
import {Upload, Button, message} from "antd"
import { useDispatch } from 'react-redux'
import { SetLoader } from '../../../redux/loadersSlice';
import { UploadProductImage,UpdateProduct } from '../../../apicall/products';

function Images({
    selectedProduct, 
    fetchData, 
    setShowProductForm
}) 
{ 
  const [showPreview = true, setShowPreview] = useState(true)
  const [file = null, setFile] = useState(null)
  const [images=[], setImages] = useState(selectedProduct.images) 
  const dispatch = useDispatch();
  const upload = async() => {
       try{
        dispatch(SetLoader(true));
        /* Upload image Functionality - upload image to cloudinary */
        const formData = new FormData();
        formData.append("file",file);
        formData.append("productId",selectedProduct._id);
        const response = await UploadProductImage(formData);
        dispatch(SetLoader(false));
          if(response.success){
            message.success(response.message);
            setImages([...images, response.data])
            setShowPreview(false);
            setFile(null);
            fetchData();
            //setShowProductForm(false);
          }
          else{
            message.error(response.message);
          }
       } catch(error){
          dispatch(SetLoader(false));
          message.error(error.message)
       }
  }
  const deleteImage = async (image) =>{
        try{
           const updateImagesArray = images.filter((img) => img !== image) ;
           const updatedProduct = {...selectedProduct, images: updateImagesArray };
           const response = await UpdateProduct(
               selectedProduct._id,
               updatedProduct
           );
           if(response.success){
             message.success(response.message);
             setImages(updateImagesArray);
             setFile(null);
             fetchData();
           } else {
             throw new Error(response.message);
           }
           dispatch(SetLoader(true)); 
        } catch(error) {
          dispatch(SetLoader(false));
          message.error(error.message)
       }
  };

  return (
    <div>
              <div className='flex gap-5 mb-5'>
                    { images.map( (image) => {
                       return (
                          <div className='flex gap-2 border border-solid border-red-500 rounded p-3 items-center'>
                             <img className='h-20 w-20 object-cover' src={image} alt="" />
                             <i className="ri-delete-bin-line red"
                            onClick={()=> deleteImage(image) }
                            ></i>
                          </div>
                       );
                    })}
               </div> 
          <Upload
            listType="picture"
            beforeUpload={ () => false}
            onChange={ (info) => {
              setFile(info.file); 
              setShowPreview(true);
            }}
            fileList={file ? [file] : []}
            showUploadList={showPreview} 
          >
               <Button type="dashed">Upload Image</Button>
          </Upload>

          <div className='flex justify-end gap-5 mt-5'>
              <Button type="default"
              onClick={() => {
                 setShowProductForm(false);
              }}
              >Cancel
              </Button>
              <Button type="primary"
              disabled={!file}
              onClick={upload}>
                  Upload
              </Button>
          </div>
    </div>
  )
}

export default Images
