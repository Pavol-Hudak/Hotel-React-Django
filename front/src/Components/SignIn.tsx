import { useState } from 'react';
import '../CSS/signin.css'
import Register from './Register';
import Login from './Login'
import Navbar from './Navbar';

const SignIn:React.FC = () => {
    const [isMember, setIsMember] = useState(true)

    const switchLogin = () => {
        setIsMember(!isMember)
    }


    return (
        <div className='main-container'>
            {/* <Navbar/> */}
            <div className='signin-container'>           
                <h1>Sign-In</h1>
                {isMember ? (
                    <Login switchLogin={switchLogin}/>
                ) : (
                    <Register switchLogin={switchLogin}/>
                )}
                
                
            </div>
        </div>
    );


  }
  
  export default SignIn
  