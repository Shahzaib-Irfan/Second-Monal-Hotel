import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Load from "../components/Load"
import AppNavbar from "../components/Navbar"
import Room from '../components/Room'
import Error from '../components/Error'
import { DatePicker, Space } from 'antd'
import 'antd/dist/reset.css'
import moment from 'moment'


const { RangePicker } = DatePicker;

export default function HomePage() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [fromDate, setFromDate] = useState()
  const [toDate, setToDate] = useState()
  const [duplicateRooms, setDuplicateRooms] = useState([])
  const [reload, setReload] = useState(false)
  const [type, setType] = useState('all')
  const [searchKey, setSearchKey] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // console.log('In the try catch block')
        const response = await axios.get('/getRooms') // Use the relative URL
        const data = response.data
        setRooms(data)
        setDuplicateRooms(data)
        //console.log(data)

        setLoading(false)
      } catch (error) {
        setError(true)
        console.log('Error ' + error)
      }
    };

    fetchData();

  }, []);
  const isDateInRange = (checkDate, fromDate, toDate) => {
    const checkTimestamp = new Date(checkDate).getTime();
    const fromTimestamp = new Date(fromDate).getTime();
    const toTimestamp = new Date(toDate).getTime();

    return checkTimestamp >= fromTimestamp && checkTimestamp <= toTimestamp;
  };

  const formatDDMMYY = (date) => {
    const originalDate = new Date(date);

    const day = String(originalDate.getDate()).padStart(2, '0');
    const month = String(originalDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
    const year = originalDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate; // Output: "10-08-2023"
  }

  function filterByDate(dates) {
    //from date
    console.log(dates[0].format("DD-MM-YYYY"));
    setFromDate(dates[0].format("DD-MM-YYYY"));
    //to date
    console.log(dates[1].format("DD-MM-YYYY"));
    setToDate(dates[1].format("DD-MM-YYYY"));

    //tempRooms
    var tempRooms = [];

    // logic of filtering rooms by date
    for (const room of duplicateRooms) {
      var availability = false;

      if (room.currentBookings.length > 0) {
        for (const booking of room.currentBookings) {
          //check between or equal to dates
          if (
            !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
              booking.fromDate,
              booking.toDate
            ) &&
            !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
              booking.fromDate,
              booking.toDate
            )
          ) {

            if (
              dates[0].format("DD-MM-YYYY") !== booking.fromDate &&
              dates[0].format("DD-MM-YYYY") !== booking.toDate &&
              dates[1].format("DD-MM-YYYY") !== booking.fromDate &&
              dates[1].format("DD-MM-YYYY") !== booking.toDate
            ) {
              availability = true;
            }
          }
        }
      } else {
        availability = true;
      }

      if (availability === true || room.currentBookings.length === 0) {
        tempRooms.push(room);
      }
    }

    setRooms(tempRooms);
  }

  const filterBySearch = () => {
    const tempRooms = duplicateRooms.filter(room => room.name.toLowerCase().includes(searchKey.toLowerCase()))

    setRooms(tempRooms)
  }

  const filterByType = (e) => {
    // setType(e.target.value)
    if(e != 'all'){
      const tempRooms = duplicateRooms.filter(room => room.type.toLowerCase() === type.toLowerCase())
      setRooms(tempRooms)
    }
  }
  return (
    <>
      <AppNavbar />
      <div className='row bs'>
        <div className='col-md-4'>
          <RangePicker format={'DD-MM-YYYY'} onChange={filterByDate} />
        </div>

        <div className="col-md-4">
          <input type="text" className='rooms-filter form-control' placeholder='Search Room By Name'
            value={searchKey} onChange={(e) => {
              setSearchKey(e.target.value)
            }} onKeyUp={filterBySearch} />
        </div>

        <select
          className='col-md-4'
          value={type}
          onChange={(e) => {
            setType(e.target.value); 
            filterByType(e); 
          }}
        >
          <option value='all'>All</option>
          <option value='delux'>Non-Delux</option>
          <option value='non-delux'>Delux</option>
        </select>
      </div>
      <div className='row justify-content-center m-5' style={{ margin: "60px" }}>
        <h2 style={{ marginLeft: "55px" }}>Rooms Offered</h2>
        {
          loading ? (<Load />) :
            (rooms.map(room => {
              return <div classname='col-md-8'>
                <Room room={room} fromDate={fromDate} toDate={toDate} />
              </div>
            }))


        }
      </div>
    </>
  )
}
