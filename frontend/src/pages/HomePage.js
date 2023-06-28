import Layout from "../components/Layout/Layout"
import React,{useState,useEffect} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {Checkbox,Radio} from 'antd'
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
//import { Link } from "react-router-dom";
const HomePage = () => {
    // eslint-disable-next-line 
    const [products,setProducts] = useState([])
    const [categories,setCategories] = useState([])
    const [checked,setChecked] = useState([])
    const [radio, setRadio] = useState([]);
    const navigate = useNavigate()

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


      //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //filter by category
  const handleFilter = (value,id) =>{
    let all = [...checked]
    if(value){
        all.push(id)
    }else{
        all= all.filter((c)=> c!==id)
    }
    setChecked(all);
  }

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
    // eslint-disable-next-line 
  }, [checked, radio]);

  //get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

    return ( 
        <Layout>
            <div className="container-fluid row mt-3">
                    <div className="col-md-2">
                        <h4 className="text-center">Filter By Category</h4>
                        <hr />
                        <div className="d-flex flex-column">
                        {categories?.map(c=>(
                            <Checkbox key={c._id} onChange={(e)=>handleFilter(e.target.checked,c._id)}>
                                {c.name}
                            </Checkbox>
                        ))}
                        </div>
                                  {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <hr />
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <hr />
            <button className="btn btn-primary" onClick={()=>window.location.reload()} style={{backgroundColor:'black'}}>Reset Filters</button>-
          </div>
                    </div>
                    <div className="col-md-9">
                        <h1 className="text-center">All Products</h1>
                        <div className="d-flex flex-wrap">

                            {products?.map((p) => (

                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                    <p className="card-text">Price of product: <b>{p.price}</b></p>
                    <button className="btn btn-primary ms-1" onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
                    <button className="btn btn-secondary ms-1">Add To Cart</button>
                  </div>
                </div>
            ))}
                        </div>
                    </div>
                </div>


        </Layout>

     );
}
 
export default HomePage;