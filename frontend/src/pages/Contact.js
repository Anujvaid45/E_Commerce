import Layout from "../components/Layout/Layout";
import {BiMailSend,BiPhoneCall,BiSupport} from 'react-icons/bi'
const Contact = () => {
    return ( 
        <Layout title={'contact us'}>
            <div className="row contactus">
                <div className="col-md-6">
                    <img src="/images/contact.jpeg" alt="contactus" style={{width:'100%'}}/>
                </div>
                <div className="col-md-4">
                    <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
                    <p className="text-justify mt-2">
                        any query and info about product feel free to call anytime,we are available 24 X 7
                    </p>
                    <p className="mt-3">
                        <BiMailSend /> : www.helpapp.com
                    </p>
                    <p className="mt-3">
                        <BiPhoneCall/> : 012-345678
                    </p>
                    <p className="mt-3">
                        <BiSupport/> : 1800-000-000 (toll free)
                    </p>
                </div>
            </div>
        </Layout>
     );
}
 
export default Contact;