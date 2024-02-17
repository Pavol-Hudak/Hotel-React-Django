import '../CSS/signin.css'

import { useState, ChangeEvent, FormEvent } from 'react';

interface loginProps{
    switchLogin: () => void;
}




function Login({switchLogin}: loginProps) {
    const [guestData, setGuestData] = useState({
        email: '',
        password: '',
    })

    const handleGuestChange = (e:ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setGuestData({ ...guestData, [name]: value });
    };

    const submitChange = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(guestData)
        try{
            const response = await fetch('api/login-guest',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(guestData)
            });
            if(response.ok){
                console.log(response)
                window.location.href='/';
            }
            else {
                console.log(JSON.stringify(guestData))
                console.log("Doesnt work")
            }
        }
        catch(error){
            console.log("error")
        }
        
    }  

    return (
        <div className='register-container'>
            <form id='register-form'  className='register-form' onSubmit={submitChange}>
                <label>Email
                    <input className='reg-input'
                        type="email"
                        name="email"     
                        value={guestData.email}
                        onChange={handleGuestChange}              
                    />
                </label>
                <label>Password
                    <input className='reg-input'
                        type="password"
                        name="password"
                        value={guestData.password}
                        onChange={handleGuestChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            <input className='switchButton' type='button' value={"Not a member? Sign up"} onClick={switchLogin}></input>
        </div>
    );


  }
  
  export default Login;
  