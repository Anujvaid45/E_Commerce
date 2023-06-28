import React,{useEffect,useState} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Select } from 'antd';

const {Option} = Select

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories,setCategories] = useState([]);
  const [name,setName] = useState('');
  const [description,setDescription] = useState('');
  const [category,setCategory] = useState('');
  const [price,setPrice] = useState('');
  const [quantity,setQuantity] = useState('');
  const [shipping,setShipping] = useState('');
  const [photo,setPhoto] = useState('');
  const[products,setProducts] = useState([]);

   //get all categories
   const getAllcategory = async(req,res)=>{
    try {
      const res = await axios.get('/api/v1/category/get-category')
      if(res.data.success)
      {
        setCategories(res.data.category)
      }
      
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong in getting category')
    }
  }

useEffect(()=>{
  getAllcategory();
},[]);

//create product

const handleCreate = async(e)=>{
  e.preventDefault();
  try {
    const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
    const res = await axios.post('/api/v1/product/create-product',productData)
    if(res.data.success)
    {
      toast.success("Product Created Successfully");
      navigate("/dashboard/admin/products");
    }
    
  } catch (error) {
    console.log(error)
    toast.error('something went wrong in creating product')
  }
}


  return (
    <Layout title={'Dashboard-Create Products'}>
        <div className="container-fluid m-3 p-3">
        <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              <Select bordered={false} placeholder="Select A Category" size='large' showSearch
              className='form-select mb-3' onChange={(value)=>{setCategory(value)}}>
                {categories?.map((c)=> (
                  <Option key ={c._id} value={c._id}>{c.name}</Option>
                ))
                }
              </Select>
              <div className="mb-3">
                <label  className='btn btn-outline-secondary col-md-12'>
                  {photo ? photo.name :" Upload Photo" }
                  <input type="file" name="photo" accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden/>
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img src={URL.createObjectURL(photo)} alt="product_photo" height={'200px'} className='img img-responsive' />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input type="text" value={name} placeholder='Write Name of Product' className='form-control' onChange={(e)=>setName(e.target.value)} />
              </div>
              <div className="mb-3">
                <textarea type='text' value={description} placeholder='Write Description of Product' className='form-control' onChange={(e)=>setDescription(e.target.value)} />
              </div>
              <div className="mb-3">
                <input type="text" value={price} placeholder='Enter Price Of Product' className='form-control' onChange={(e)=>setPrice(e.target.value)} />
              </div>
              <div className="mb-3">
                <input type="text" value={quantity} placeholder='Enter Quantity of Product' className='form-control' onChange={(e)=>setQuantity(e.target.value)} />
              </div>
              <div className="mb-3">
                <Select bordered={false} className='form-select mb-3'  placeholder='Select shipping' size='large' onChange={(value)=>setShipping(value)}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select>
              </div>
              <div className="mb-3">
                <button className='btn btn-primary' onClick={handleCreate} style={{marginLeft:'330px'}}>CREATE PRODUCT</button>
              </div>

            </div>
            
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default CreateProduct