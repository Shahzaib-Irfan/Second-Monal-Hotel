import React, { useEffect, useState } from "react"
import Load from "../components/Load"
import Error from "../components/Error"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import StripeCheckout from 'react-stripe-checkout'
import AppNavbar from '../components/Navbar'
import Cookies from "js-cookie"

function Booking() {
  let { roomid, fromDate, toDate } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const [room, setRoom] = useState({})
  const [totalDays, setTotalDays] = useState(0)
  const [totalRent, setTotalRent] = useState(0)

  const stripeKey = 'pk_test_51NdFjDHO3kvTfl2zZkWaXLIU17EsFDZY1WEf52fD0dtbQIkFzuz3EYDnfHYAhEfO5j2SI4D0XcUrtZGvJ78HydPi00qg7Ev918'

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/getRoomById?id=${roomid}`)
        const data = response.data
        setRoom(data)
        setLoading(false)

        setTotalDays(calculateDays(fromDate, toDate))
        const totalRentSetted = response.data.rentPerDay * calculateDays(fromDate, toDate)
        console.log(totalRentSetted)
        setTotalRent(totalRentSetted)
      } catch (error) {
        setError(true)
        console.log('Error ' + error)
      }
    }
    fetchData()
  }, [])

  const calculateDays = (date1, date2) => {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;

    const [day1, month1, year1] = date1.split('-').map(Number);
    const [day2, month2, year2] = date2.split('-').map(Number);

    const startDate = new Date(year1, month1 - 1, day1); // Subtract 1 from month1
    const endDate = new Date(year2, month2 - 1, day2); // Subtract 1 from month2

    const timeDifference = endDate - startDate;
    const daysDifference = Math.floor(timeDifference / millisecondsPerDay);

    return daysDifference + 1;
  }

  const BookRoom = () => {
    const bookingDetails = {
      room,
      userId: JSON.parse(Cookies.get('currentUserForHotelApp'))._id,
      fromDate,
      toDate,
      totalRent,
      totalDays
    }
    try {
      const response = axios.post('/postBooking', bookingDetails)
      response.then(success => {
        alert('Successful in Booking')
        navigate('/home')
      })
    } catch (error) {

    }
  }

  const onToken = (token) =>{
    const bookingDetails = {
      room,
      userId: JSON.parse(Cookies.get('currentUserForHotelApp'))._id,
      fromDate,
      toDate,
      totalRent,
      totalDays,
      token
    }
    try {
      const response = axios.post('/postBooking', bookingDetails)
      response.then(success => {
        alert('Successful in Booking')
        navigate('/home')
      })
    } catch (error) {

    }
  }
  return (
    <React.Fragment>
      <AppNavbar />
      {
        loading ? (<Load />) : room ?
          (<div className="row bs booking-row">
            <div className='col-md-5'>
              <h1>{room.name}</h1>
              <div className="img-container">
                <img src={`/images/${room.imageurls[0]}`} alt="room Image" className="img-fluid booking-img" />
              </div>
            </div>
            <div className='col-md-7 amount-detail-booking'>
              <h1>Booking Details</h1>
              <hr />

              <br />
              <p>From Date: {fromDate}</p>
              <p>To Date: {toDate}</p>
              <p>Max Count: {room.maxCount}</p>

              <div>
                <h1>Amount</h1>
                <hr />
                <p>Rent per day : {room.rentPerDay}</p>
                <p>Total Days: {totalDays}</p>
                <p>Total Amount Due: {totalRent}</p>
              </div>

              <div style={{ float: "left" }}>
                <StripeCheckout
                  amount={totalRent * 100}
                  token={onToken}
                  currency={'USD'}
                  stripeKey={stripeKey}
                />
              </div>
            </div>
          </div>) : (<Error />)
      }
    </React.Fragment>
  )
}

export default Booking 