import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2';
const { TabPane } = Tabs;


function Profilescreen() {
    const User = JSON.parse(localStorage.getItem('currentUser'));
    const u = User.user;
    useEffect(()=>{
        if(!u)
        {
            window.location.href('/Login');
        }
    },[])
  return (
    <div className='mt-3 ml-5'>
        <Tabs defaultActiveKey='1'>
            <TabPane tab="Profile" className='bs col-md-7' key="1">
                <br/>
                <h1>Name : {u.name}</h1>
                <h1>Email : {u.email}</h1>
                <h1>IsAdmin : {u.IsAdmin ? "Yes" : "No"}</h1>
            </TabPane>
            <TabPane tab="Bookings" key="2">
                <MyBookings/>
            </TabPane>
        </Tabs>
    </div>

  )
}

export default Profilescreen


export function MyBookings() {
    const User = JSON.parse(localStorage.getItem('currentUser'));
    const [booking , setbooking] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
      const fetchData = async () => {
        try {
            setLoading(true);
          const response = await axios.post('http://localhost:5000/api/bookings/getbookingsbyuserid', { userid: User.user._id });
          const bookings = response.data;
          setbooking(bookings);
          setLoading(false);
          console.log(booking);
        } catch (error) {
          console.log(error);
          setLoading(false);
          setError(true);
        }
      };
  
      fetchData();
    }, []);
    
    async function CancelBooking(id , roomid)
    {
        try {
            setLoading(true);
            const result = (await axios.post('http://localhost:5000/api/bookings/cancelbooking', { id , roomid })).data;
            console.log(result);
            setLoading(false);
            Swal.fire('Congratulations' , 'Your room booking has been cancelled' , 'success').then(result => {window.location.reload()});
        } catch (error) {
            console.log(error);
            setLoading(false);
            Swal.fire('Oops' , 'Your room booking can not be cancelled' , 'error');
        }
    }
    return (
        <div className='row'>
            <div className='col-md-6'>
                {loading && <Loader />}
                {booking &&
                booking.map((bookin, index) => (
                    <div className='bs' key={index}>
                        <h3><b>{bookin.room}</b></h3>
                        <p><b>Booking Id : </b>{bookin._id}</p>
                        <p><b>Check In :</b> {bookin.fromdate}</p>
                        <p><b>Check Out :</b> {bookin.todate}</p>
                        <p><b>Amount :</b> {bookin.totalAmount}</p>
                        <p><b>Status :</b> {bookin.status == 'booked' ? "Confirmed" : "Cancelled"}</p>
                        {bookin.status !== 'cancelled' && (
                            <div className='text-right'>
                                <button
                                    className='btn btn-primary'
                                    style={{ backgroundColor: 'black', color: 'white', boxShadow: 'none' }}
                                    onClick={() => {
                                        console.log("Cancel button clicked");
                                        CancelBooking(bookin._id, bookin.roomid);
                                    }}
                                >
                                    Cancel Booking
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>

    );
        
        
}
