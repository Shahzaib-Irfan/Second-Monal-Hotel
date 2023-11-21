import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment'
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

function Homescreen() {
    const [rooms, setRooms] = useState([]); // Initialize rooms as an empty array
    const [loading, setLoading] = useState(false); // Initialize with false
    const [error, setError] = useState(false); // Initialize with false
    const [fromdate , setfromDate] = useState();
    const [todate , settoDate] = useState();
    const [duplicaterooms , setduplicaterooms] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Set loading to true before fetching data
                const data = (await axios.get("http://localhost:5000/api/rooms/getAllrooms")).data;
                const roomsArray = data.rooms;
                setRooms(roomsArray);
                setduplicaterooms(roomsArray);
                setLoading(false); // Set loading to false after fetching data
            } catch (error) {
                setError(true); // Set error to true if there's an error
                console.error(error);
                setLoading(false); // Set loading to false if there's an error
            }
        };
        fetchData();
    }, []); 

    function FilterByDate(dates, dateStrings) {
        setfromDate(dates[0].format('DD-MM-YYYY'));
        settoDate(dates[1].format('DD-MM-YYYY'));
        var temprooms = [];
        var availability = false;
        for (const room of duplicaterooms) {
            if (room.currentBookings && room.currentBookings.length > 0) {
                availability = false;
                for (const booking of room.currentBookings) {                    
                        const fromDateString = booking.fromdate;
                        const fromParts = fromDateString.split('-');
                        const fromDate = new Date(fromParts[2], fromParts[1] - 1, fromParts[0]);
                        
                        // Similarly, do the same for toDate
                        const toDateString = booking.todate;
                        const toParts = toDateString.split('-');
                        const toDate = new Date(toParts[2], toParts[1] - 1, toParts[0]);
                        const date0 = new Date(dates[0].format('MM-DD-YYYY'));
                        const date1 = new Date(dates[1].format('MM-DD-YYYY'));
                        
                    if (!(date0 >= fromDate && date0 <= toDate) && !(date1 >= fromDate && date1 <= toDate)) {
                        if (
                            moment(dates[0].format('DD-MM-YYYY'))._i !== booking.fromdate &&
                            moment(dates[0].format('DD-MM-YYYY'))._i !== booking.todate &&
                            moment(dates[1].format('DD-MM-YYYY'))._i !== booking.fromdate &&
                            moment(dates[1].format('DD-MM-YYYY'))._i !== booking.todate
                        ) {
                            availability = true;
                            
                        }
                    }
                }
            }
            if (availability) {
                temprooms.push(room);
            }
            setRooms(temprooms);
        }
        
    }
    
    

    return (
        <div className='container'>

            <div className='row mt-5'>
                <div className='col-md-3'>
                    <RangePicker format="DD-MM-YYYY" onChange={(dates, dateStrings) => FilterByDate(dates, dateStrings)} />     
                </div>
            </div>

            <div className='row justify-content-center mt-5'>
                {loading ? (
                    <Loader/>
                ) : error ? (
                    <Error/>
                ) : rooms.length === 0 ? (
                    <h1>No rooms available</h1>
                ) : (
                    rooms.map((room, index) => {
                        return <div key={index} className='col-md-9 mt-3'>
                            <Room room={room} index={index} fromdate={fromdate} todate = {todate}/>
                        </div>
                    })
                )}
            </div>
        </div>
    );
}

export default Homescreen;
