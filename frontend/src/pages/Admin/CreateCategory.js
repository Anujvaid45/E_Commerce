import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-toastify';
import axios from 'axios'
import { Modal } from "antd";
import CategoryForm from '../../components/Form/CategoryForm';
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('')
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");


  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/v1/category/create-category', { name })
      if (res.data.success) {
        toast.success(`category ${name} is created`)
        getAllcategory();
        setName('');

      }
      else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('something went wrong in input form')
    }

  }



  //get all categories
  const getAllcategory = async (req, res) => {
    try {
      const res = await axios.get('/api/v1/category/get-category')
      if (res.data.success) {
        setCategories(res.data.category)
      }

    } catch (error) {
      console.log(error)
      toast.error('Something went wrong in getting category')
    }
  }

  useEffect(() => {
    getAllcategory();
  }, []);

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllcategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  //delete category
  const handleDelete = async (pId) => {
    try {
      const confirmBox = window.confirm(`Are You Sure You Want To Delete this Category?`)
      if (confirmBox === true) 
      {
        const res = await axios.delete(`/api/v1/category/delete-category/${pId}`)
        if (res.data.success) 
        {
          toast.success(`category is deleted`);
          getAllcategory();
        }
        else 
        {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.log(error)
      toast.error('something went wrong in deleting category')
    }
  }

  return (
    <Layout title={'dashboard-Create Category'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}></CategoryForm>
            </div>
            <div className='w-75'>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map(c => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button onClick={() => { setVisible(true); setUpdatedName(c.name); setSelected(c) }} className='btn btn-primary ms-2'>Edit</button>
                          <button onClick={() => { handleDelete(c._id) }} className='btn btn-danger ms-2'>Delete</button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>

            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory