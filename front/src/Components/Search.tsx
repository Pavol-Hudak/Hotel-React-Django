import React, { useState, ChangeEvent, useEffect} from 'react';
import '../CSS/search.css'
import { getCsrfToken, fetchCsrfToken } from './csrfToken';
import { useNavigate } from 'react-router-dom';
interface Counts {
    adult: number;
    child: number;
    senior: number;
}
/*interface Room {
    capacity: number;
    room_type: string;
    price: number;
    description: string;
}*/
interface SearchBox{
    persons: number;
    checkInSearch: string;
    checkOutSearch: string;
}

const Search: React.FC = () => {

    const getSessionStorageCounts = () => {
        const storedCounts = sessionStorage.getItem('counts');
        if (storedCounts) {
            return JSON.parse(storedCounts) as Counts;
        }
        return {
            adult: 0,
            child: 0,
            senior: 0,
        };
    };


    const [counts, setCounts] = useState<Counts>(getSessionStorageCounts());
    const [totalPersonCount, setTotalPersonCount] = useState<number>(0);
    //const [test, setTest] = useState<Room | null>(null)
    const [searchReq, setSearchReq] = useState<SearchBox | null>(null)

    const [rawCheckInDate, setRawCheckInDate] = useState<string>('');
    const [rawCheckOutDate, setRawCheckOutDate] = useState<string>('');
    const [formattedCheckInDate, setFormattedCheckInDate] = useState<string>('');
    const [formattedCheckOutDate, setFormattedCheckOutDate] = useState<string>('');

    const [dateError,setDateError] = useState<string>('');
    

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const input = e.target.value;

        // Remove any non-numeric characters from the input
        const numericInput = input.replace(/\D/g, '');

        // Split the numeric input into day, month, and year
        const day = numericInput.slice(0, 2);
        const month = numericInput.slice(2, 4);
        const year = numericInput.slice(4, 8);

        // Format the date as "DD/MM/YYYY"
        let formatted = '';

        if (numericInput.length >= 1) {
            formatted += day;
        }

        if (numericInput.length >= 3) {
            formatted += `/${month}`;
        }

        if (numericInput.length >= 5) {
            formatted += `/${year}`;
        }

        if(name === 'checkIn-input'){
            setFormattedCheckInDate(formatted);
            setRawCheckInDate(`${year}-${month}-${day}`)
           
        }
        else if(name === 'checkOut-input'){
            setFormattedCheckOutDate(formatted)  
            setRawCheckOutDate(`${year}-${month}-${day}`) 
              
        };
    }

    const changeNumber = (e: React.MouseEvent<HTMLInputElement, MouseEvent>, key: keyof typeof counts, change: number) => {
        setCounts((prevState) => ({
            ...prevState,
            [key]: Math.max(prevState[key] + change, 0),
        }));
    }
    useEffect(() => {
        fetchCsrfToken()
    },[]); 
    
    useEffect(() => {
        sessionStorage.setItem('counts', JSON.stringify(counts));
        setTotalPersonCount(counts.adult + counts.child + counts.senior)
    }, [counts]);

    useEffect(() => {
        setSearchReq((prevSearchReq) => ({
            ...prevSearchReq,
            persons: totalPersonCount,
            checkInSearch: rawCheckInDate,
            checkOutSearch: rawCheckOutDate,
        }))
    },[rawCheckInDate, rawCheckOutDate, totalPersonCount])

    const navigate = useNavigate();
    const searchForRoom = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(rawCheckInDate.length < 10 || rawCheckOutDate.length < 10){
            setDateError("Please enter a valid date")
            return;
        }  
        if(totalPersonCount === 0){
            setDateError("Please enter a valid number of people")
            return;
        }
        if(rawCheckInDate.slice(0,4) > rawCheckOutDate.slice(0,4)){
            setDateError("Check-out date must be after check-in date")
            return;
        }
        try{
            const csrfToken = getCsrfToken();
            const response = await fetch('api/find-room',{
                method: 'POST',
                headers:{
                    'X-CSRFToken': csrfToken ?? '',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(searchReq)
            });
            if(response.ok){
                const responseData = await response.json();
                const data_to_parse = JSON.parse(responseData)
                console.log(data_to_parse)
                console.log(formattedCheckInDate,formattedCheckOutDate)
                localStorage.setItem('checkInDate',formattedCheckInDate)
                localStorage.setItem('checkOutDate',formattedCheckOutDate)
                navigate('/rooms', {state: {parsedData: data_to_parse}})
            }
            else {
                const errorMessage = await response.text();
                console.log(errorMessage)
                console.log(JSON.stringify(searchReq))
                setDateError("No rooms available for the selected dates")
                return;
            }
        }
        catch(error){
            setDateError("No rooms available for the selected dates")
            return;
        }

        /*await fetch('api/get-rooms')
        .then((response) => {
            if(response.ok){
                return response.json();
            }
            else throw new Error('Failed to fetch')
        })
        .then((data) => {
            setTest(data);
        })
        .catch((error) => {
            console.error(error)
        })*/

    }

    return(
        <div className='searchContainer' style={{zIndex:1}}>
            <form id='search-room' onSubmit={searchForRoom}>
                    <span className='input-span'>
                        <input name='checkIn-input' className='date-input' type='text' placeholder="Check-in" value={formattedCheckInDate} onChange={handleChange}></input>
                        {dateError && <p className='error'>{dateError}</p>}
                    </span>
                    <input name='checkOut-input' className='date-input' type='text' placeholder="Check-out" value={formattedCheckOutDate} onChange={handleChange}></input>
                    <div className='select-persons'>
                        <div className='row'>                           
                            <h3>Adult</h3>
                            <input className="minus-button" type='button' value={"-"} onClick={e => changeNumber(e,'adult',-1)}></input>  
                            <span>{counts.adult}</span>
                            <input className="plus-button" type='button' value={"+"} onClick={e => changeNumber(e,'adult',1)}></input>

                            <h3>Children</h3>
                            <input className="minus-button" type='button' value={"-"} onClick={e => changeNumber(e,'child',-1)}></input>    
                            <span>{counts.child}</span>   
                            <input className="plus-button" type='button' value={"+"} onClick={e => changeNumber(e,'child',1)}></input>
                            
                            <h3>Senior</h3>                                     
                            <input className="minus-button" type='button' value={"-"} onClick={e => changeNumber(e,'senior',-1)}></input>                       
                            <span>{counts.senior}</span>  
                            <input className="plus-button" type='button' value={"+"} onClick={e => changeNumber(e,'senior',1)}></input>                                    
                        </div>
                        <input type='submit' className='find-button' value={"Find a room"}/>
                    </div>        
            </form>
        </div>     
    )
}
export default Search;