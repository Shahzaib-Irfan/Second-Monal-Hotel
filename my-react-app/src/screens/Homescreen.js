import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';


function Homescreen() {
    const [rooms, setRooms] = useState([]); // Initialize rooms as an empty array
    const [loading, setLoading] = useState(false); // Initialize with false
    const [error, setError] = useState(false); // Initialize with false

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Set loading to true before fetching data
                const data = (await axios.get("http://localhost:5000/api/rooms/getAllrooms")).data;
                const roomsArray = data.rooms;
                setRooms(roomsArray);
                setLoading(false); // Set loading to false after fetching data
            } catch (error) {
                setError(true); // Set error to true if there's an error
                console.error(error);
                setLoading(false); // Set loading to false if there's an error
            }
        };
        fetchData();
    }, []); 

    return (
        <div className='container'>
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
                            <Room room={room} index={index}/>
                        </div>
                    })
                )}
            </div>
        </div>
    );
}

export default Homescreen;
