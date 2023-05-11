import {useState} from 'react'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate} from 'react-router-dom';
import '../../styles/AuthStyles.css';


const ForgotPassword = () => {

    const[email,setEmail] = useState("")
    const[answer,setAnswer] = useState("")
    const[newPassword,setNewPassword] = useState("")

    const navigate = useNavigate()


    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/forgot-password',
            {email,answer,newPassword}
            );
            if(res && res.data.success){
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
    return (
        <Layout title={'forgot-password'}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h4 className="title">Reset Password</h4>

                    <div className="mb-3">
                        <input type="email"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter Your Email'
                            value={email}
                        />
                    </div>
                    <div className="mb-3">
                        <input type="text"
                            className="form-control"
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder='Enter Your favourite Sports Player'
                            value={answer}
                        />
                    </div>
                    <div className="mb-3">
                        <input type="password"
                            className="form-control"
                            placeholder='Enter New Password'
                            onChange={(e) => setNewPassword(e.target.value)}
                            value={newPassword}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">RESET</button>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword