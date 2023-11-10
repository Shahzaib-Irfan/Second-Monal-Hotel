import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Bookingscreen() {
  let { roomid } = useParams();
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
  
        const response = await axios.get(`http://localhost:5000/api/rooms/getroombyid/${roomid}`);
        const data = response.data;
        setRoom(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error(error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []); 
  

  return (
    <div className='m-5'>
        {loading ? (
            <h1>Loading...</h1>
        ) : error ? (
            <h1>Error...</h1>
        ) : (
        <div>
            <div className='row justify-content-center mt-3 bs'>
                <div className='col-md-6'>
                    {room && (
                    <>
                        <h2>{room.name}</h2>
                        {room.imageUrls && room.imageUrls[0] && (
                        <img src={room.imageUrls[0]} alt={room.name} className='smallimgBook' />
                        )}
                    </>
                    )}
                </div>
                <div className='col-md-6' style={{textAlign :'right'}} >
                    <div>
                        <h2>Booking Details</h2>
                        <hr />
                        <b>
                            <p>Name :</p>
                            <p>From Date :</p>
                            <p>To Date :</p>
                            <p>Max Count : {room.maxCount}</p>
                        </b>
                    </div>
                    <div>
                        <h2>Amount</h2>
                        <hr />
                        <b>
                            <p>Total days</p>
                            <p>Rent Per day : {room.rentperday}</p>
                            <p>Total Amount</p>
                        </b>
                    </div>
                    <div style={{float : 'right'}}>
                        <button className='btn btn-primary' style={{ backgroundColor: 'black', color: 'white' , boxShadow: 'none'}}>Pay Now</button>
                    </div>
                </div>
                </div>
            </div>
        )}
    </div>

  );
}

export default Bookingscreen;
