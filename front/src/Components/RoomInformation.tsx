import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import '../CSS/roomInformation.css'
import { fetchCsrfToken, getCsrfToken } from "./csrfToken";

const RoomInformation: React.FC = () => {
    const location = useLocation();
    const {parsedData} = location.state || {parsedData: []};
    const [formattedCheckInDate, setFormattedCheckInDate] = useState<string>('');
    const [formattedCheckOutDate, setFormattedCheckOutDate] = useState<string>('');
    
    console.log(parsedData)

    useEffect(() => {
        fetchCsrfToken();
        setFormattedCheckInDate(localStorage.getItem('checkInDate') ?? '')
        setFormattedCheckOutDate(localStorage.getItem('checkOutDate') ?? '')
    });

    const createReservation = async() => {
        const csrfToken = getCsrfToken();
        fetch('/api/create-reservation',{
            method: 'POST',
            headers:{
                'X-CSRFToken': csrfToken ?? '',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(parsedData)
        })
        .then((response) => {
            if(response.ok){
                return response.json();
            }
            else throw new Error('Failed to f')
        })
    }

    return(
        <div className="room-information-container">
            <div className="room-info">
                <p>{parsedData.fields.capacity}</p>
                <p>{parsedData.fields.price}</p>
                <p>{parsedData.fields.description}</p>
                <p>{parsedData.fields.room_type}</p>
                <p>Room</p>
            </div>
            <div className="payment-info">
                <p>Pricing<br/>{formattedCheckInDate} - {formattedCheckOutDate}<br/>Total:</p>
                <button onClick={createReservation}>Create reservation</button>
            </div>
        </div> 
        )
}
export default RoomInformation;