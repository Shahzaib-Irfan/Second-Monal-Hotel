import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';

function Bookingscreen() {
  let { roomid } = useParams();
  let { fromdate } = useParams();
  let { todate } = useParams();
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const fromdate1 = moment(fromdate, 'DD-MM-YYYY');
  const todate1 = moment(todate, 'DD-MM-YYYY');
  const totalDays = moment.duration(todate1.diff(fromdate1)).asDays();
  

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
            <Loader/>
        ) : error ? (
            <Error/>
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
                            <p>From Date : {fromdate}</p>
                            <p>To Date :{todate}</p>
                            <p>Max Count : {room.maxCount}</p>
                        </b>
                    </div>
                    <div>
                        <h2>Amount</h2>
                        <hr />
                        <b>
                            <p>Total days : {totalDays}</p>
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
