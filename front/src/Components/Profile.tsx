
import SidebarMenu from "./SidebarMenu";
import '../CSS/profile.css'
import { useRef, useEffect, useState, ChangeEvent } from "react";


interface Guest {
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    password: string;
    id: number;
}


interface Reservation {
    fields: {
        room_id: number;
        res_from: string;
        res_until: string;
        people: number;
    };
}

interface Room {
    fields: {
        room_type: string;
        price: number;
        description: string;
    }
}

interface ReservationInfo{
    reservation: Reservation[];
    room: Room[];
}


const Profile: React.FC = () => {
    let [userData, setUserData] = useState<Guest | null>(null)
    
    const [reservationData, setReservationData] = useState<ReservationInfo> ({
        reservation: [],
        room: []
    });
    
    let personalInfo = [{
        label: 'First name',
        type: 'text',
        name: 'first_name', 
        placeholder: userData?.first_name
    },
    {
        label: 'Middle name',
        type: 'text',
        name: 'middle_name', 
        placeholder: userData?.middle_name
    },{
        label: 'Last name',
        type: 'text',
        name: 'last_name', 
        placeholder: userData?.last_name
    },{
        label: 'Email',
        type: 'text',
        name: 'email',
        placeholder: userData?.email
    }]
        

    useEffect(() => {
        fetch('api/get-userdata')
        .then(response => response.json())
        .then(data => setUserData(data))  

        fetch('api/get-guest-reservations')
        .then(response => response.json())
        .then(data => {
            const parsedData = {
                reservation: JSON.parse(data.reservations),
                room: JSON.parse(data.reserved_rooms)
            }
            setReservationData(parsedData)
            console.log("a"  + parsedData)
        })  
    },[]);
    
    useEffect(() => {
    }, []);
    
    const formRef = useRef<HTMLFormElement | null>(null);

    const enableEditing = () => {
        formRef.current = document.getElementById('edit-personal-info-form') as HTMLFormElement;
        if (formRef.current) {
            const inputs = formRef.current.querySelectorAll('input');
            const hiddenElements =  formRef.current.querySelector(".hidden-label") as HTMLLabelElement;
            hiddenElements.style.display = hiddenElements.style.display === "none" ? "flex" : "none";
            inputs.forEach((input) => {
                input.disabled = !input.disabled;
            });
        }
    }

    let [temp,setTemp] = useState<string>("")

    const handleChange = (e:ChangeEvent<HTMLInputElement>, input:string) => {
        /*console.log(e.target.value);
        console.log(input)*/
        for(const infoItem of personalInfo){
            if(infoItem.name === input){
                infoItem.placeholder = e.target.value
                setTemp(infoItem.placeholder)
                console.log(temp)
            }
        }
        /*console.log("finito")
        console.log(personalInfo)*/
    }
    
    return(
        <>
            {/* <Navbar/> */}
            <div className="profile-content">
                    <SidebarMenu/>          
                <div className="profile-info">  
                    <section id='personal-information' className="info-section">
                        <form id='edit-personal-info-form'>
                            <h1>Personal information</h1>
                            {personalInfo.map((info) => {
                                return (
                                <label key={info.label}>                               
                                    {info.label}
                                    <input disabled={true} onChange={(e) => handleChange(e, info.name)}
                                     type={info.type} name={info.name} placeholder={info.placeholder}/>
                                </label>
                                )
                            })}
                            <label className="hidden-label" style={{display: 'none'}}>Confirm email
                                    <input disabled={true} type='text' name='confirmEmail' placeholder="Confirm email" />
                                </label>
                            <button className="edit-info-button" type="button" onClick={enableEditing}>Edit</button>
                        </form>
                    </section>
                    <section id='your-reservation' className="info-section">
                        <h1>Your reservations{userData?.id}</h1>
                        <ul className="room-list">
                        {reservationData.reservation.map((reservation, index) => (
                            <li className="room-list-item" key={index}>
                                <p>Room Number: {reservation.fields.room_id}</p>
                                <p>Reservation From: {reservation.fields.res_from}</p>
                                <p>Reservation Until: {reservation.fields.res_until}</p>
                                <p>Guests: {reservation.fields.people}</p>
                            </li> 
                        ))}
                        </ul>
                    </section>
                </div>
            </div>          
        </>
    )
}
export default Profile;