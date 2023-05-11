import React,{useEffect,useState} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-toastify';
import axios from 'axios'

const CreateProduct = () => {

  const[products,setProducts] = useState([]);

   //get all categories
   const getAllproduct = async(req,res)=>{
    try {
      const res = await axios.get('/api/v1/product/get-product')
      if(res.data.success)
      {
        setProducts(res.data.products)
      }
      
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong in getting category')
    }
  }

useEffect(()=>{
  getAllproduct();
},[]);

//delete product
const handleDelete = async(pId)=>{
  try {
    const res = await axios.delete(`/api/v1/product/product-delete/${pId}`)
    if(res.data.success)
    {
      toast.success(`Product is deleted`);
      getAllproduct();
    }
    else
    {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.log(error)
    toast.error('something went wrong in deleting product')
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
            <div className='w-75'> 
<table className="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
      <th scope="col">Price</th>
      <th scope="col">Quantity</th>
      <th scope="col">Category</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
     {products?.map(p=> (
      <>
        <tr>
          <td key={p._id}>{p.name}</td>
          <td key={p._id}>{p.description}</td>
          <td key={p._id}>{p.price}</td>
          <td key={p._id}>{p.quantity}</td>
          <td key={p._id}>{p.category.slug}</td>
  
          <td>
            <button   className='btn btn-primary ms-2'>Edit</button>
            <button onClick={() => {handleDelete(p._id)}}  className='btn btn-danger ms-2'>Delete</button>
          </td>
        </tr>
      </>
    ))}
  </tbody>
</table>

            </div>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default CreateProduct