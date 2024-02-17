import React, { useEffect, useState } from "react";
import '../CSS/roomList.css'
import { useNavigate } from "react-router-dom";

interface RoomListProps{
    roomData: any[];
}

const RoomList:React.FC<RoomListProps> = (props) => {
    const {roomData} = props;
    const navigate = useNavigate();
    const [formattedCheckInDate, setFormattedCheckInDate] = useState<string>('');
    const [formattedCheckOutDate, setFormattedCheckOutDate] = useState<string>('');
    useEffect(() => {
        setFormattedCheckInDate(localStorage.getItem('checkInDate') ?? '')
        setFormattedCheckOutDate(localStorage.getItem('checkOutDate') ?? '')
    },[])
    console.log(roomData)
    const navigateToRoom = (room: any[]) => {
        navigate('/rooms/listing', {state: {parsedData: room}})
    }

    return(
        <div className="room-list-container">
            <h1>{formattedCheckInDate} - {formattedCheckOutDate}</h1>
            <ul>
            {roomData.map((room, index) => (
                <li key={index} >
                    <a onClick={() => navigateToRoom(room)} className="room-listing">
                        <p>Capacity: {room.fields.capacity}</p>
                        <p>Room Type: {room.fields.room_type}</p>
                        <p>Price: {room.fields.price}</p>
                        <p>Description: {room.fields.description}</p>
                        <p>RoomList</p>
                    </a>
                </li>
            ))}
            </ul>
        </div>
    )
}
export default RoomList;