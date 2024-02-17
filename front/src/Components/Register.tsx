import React, { ChangeEvent, FormEvent, useState } from 'react';
import '../CSS/signin.css'

interface registerProps{
    switchLogin:() => void;
}


function Register({switchLogin}: registerProps) {
    const [guestData, setGuestData] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        date_of_birth: '',
        email: '',
        password: '',
    })

    const handleGuestChange = (e:ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setGuestData({ ...guestData, [name]: value });
    };
    
    const submitChange = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const response = await fetch('api/register-guest',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(guestData)
            });
            if(response.ok){
                console.log(response)
                window.location.reload();
            }
            else {
                const errorMessage = await response.text();
                console.log(errorMessage)
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
                <form id='register-form' onSubmit={submitChange} className='register-form'>
                    <label>First name
                        <input className='reg-input'
                            type="text"
                            name="first_name"
                            value={guestData.first_name}
                            onChange={handleGuestChange}
                        />
                    </label>
                    <label>Middle name
                        <input className='reg-input'
                            type="text"
                            name="middle_name"
                            value={guestData.middle_name}
                            onChange={handleGuestChange}
                        />
                    </label>
                    <label>Last name
                        <input className='reg-input'
                            type="text"
                            name="last_name"
                            value={guestData.last_name}
                            onChange={handleGuestChange}
                        />
                    </label>
                    <label>Date of birth
                        <input className='reg-input'
                            type="date"
                            name="date_of_birth"
                            value={guestData.date_of_birth}
                            onChange={(e) => {
                                handleGuestChange(e); 
                            }}
                        />
                    </label>
                    <label>Email
                        <input className='reg-input'
                            type="email"
                            name="email"
                            value={guestData.email}
                            onChange={handleGuestChange}
                        />
                    </label>
                    <label>Password
                        <input  className='reg-input'
                            type="password"
                            name="password"
                            value={guestData.password}
                            onChange={handleGuestChange}  
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>               
            <input className='switchButton' type='button' value={"Already a member? Sign in"} onClick={switchLogin}></input>
        </div>
    );
  }
  export default Register;
  