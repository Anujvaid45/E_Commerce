import React ,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate} from 'react-router-dom';
import '../../styles/AuthStyles.css';

const Register = () => {

    const[name,setName] = useState("")
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const[phone,setPhone] = useState("")
    const[address,setAddress] = useState("")
    const[answer,setAnswer] = useState("")
    const[role,setRole] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/register',
            {name,email,password,phone,address,answer,role}
            );
            if(res.data.success){
                toast.success(res.data.message)
                setTimeout(()=>{navigate('/login')},2000)
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }

        

    }

    const handleChange = event => {
        //console.log(event.target.value);
        setRole(event.target.value);
      };

    return (
        <Layout title={'Register'}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                <h4 className="title">REGISTER FORM</h4>
                <div className="mb-3">
                        <input
                        
                        type="radio"
                        id="0"
                        className='radio'
                        name="0"
                        value="0"
                        checked={role === '0'}
                        onChange={handleChange} 
                        />
                        <label htmlFor="0" style={{paddingRight:'150px'}} className='label'>User</label>

                        <input
                        type="radio"
                        className='radio'
                        id="1"
                        name="1"
                        value="1"
                        onChange={handleChange} 
                        checked={role === '1'}
                        />
                        <label htmlFor="1" className='label'>Admin</label>
                    </div>
                <div className="mb-3">
                        <input type="text" 
                        placeholder='Enter Your Name'
                        className="form-control"
                        onChange={(e)=>setName(e.target.value)}
                        value = {name}
                        />
                    </div>
                    <div className="mb-3">
                        <input type="email"
                         className="form-control" 
                         onChange={(e)=>setEmail(e.target.value)}
                         placeholder='Enter Your Email'
                         value = {email}
                         />
                    </div>
                    <div className="mb-3">
                        <input type="password"
                         className="form-control"
                         placeholder='Enter Your Password'
                         onChange={(e)=>setPassword(e.target.value)}
                         value = {password}
                         />
                    </div>
                    <div className="mb-3">
                        <input type="text"
                         className="form-control" 
                         placeholder='Enter Your Phone No.'
                         onChange={(e)=>setPhone(e.target.value)}
                         value = {phone}
                          />
                    </div>
                    <div className="mb-3">
                        <input type="text"
                         className="form-control"
                         placeholder='Enter Your Address'
                         onChange={(e)=>setAddress(e.target.value)}
                         value = {address}
                         />
                    </div>
                    <div className="mb-3">
                        <input type="text"
                         className="form-control"
                         placeholder='Who Is your favourite player'
                         onChange={(e)=>setAnswer(e.target.value)}
                         value = {answer}
                         />
                    </div>
                    <button type="submit" className="btn btn-primary">REGISTER</button>
                </form>
            </div>
        </Layout>

    )
}

export default Register