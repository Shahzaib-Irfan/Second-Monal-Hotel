import React , {useEffect , useState} from 'react'
import { Tabs } from 'antd';
import axios, { AxiosHeaders } from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
const { TabPane } = Tabs;

function Adminscreen() {
  return (
    <div className='mt-3 ml-3 mr-3 bs'>
        <h3 className='text-center'>Admin Panel</h3>
        <Tabs defaultActiveKey='1'>
            <TabPane tab="Bookings" key="1">
                <Bookings/>
            </TabPane>
            <TabPane tab="Rooms" key="2">
                <Rooms/>
            </TabPane>
            <TabPane tab="Add Rooms" key="3">
                <h1>Add Rooms</h1>
            </TabPane>
            <TabPane tab="Users" key="4">
                <h1>Users</h1>
            </TabPane>
        </Tabs>
    </div>
  )
}

export default Adminscreen


export function Bookings()
{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [bookings , setbookings] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/api/bookings/getallbookings');
                const bookins = response.data;
                setbookings(bookins);
            } catch (error) {
                setError(true);
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData(); // Call the async function immediately
    } , []);
    return (
        <div className='row'>
            <div className='col-md-10'>
            <h1>Bookings</h1>
            {loading && (<Loader/>)}
            <table className='table table-border table-dark'>
                <thead className='bs'>
                    <tr>
                        <th>Booking Id</th>
                        <th>User Id</th>
                        <th>Room</th>
                        <th>From</th>
                        <th>From</th>
                        <th>From</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.length > 0 && (bookings.map(booking =>{
                        return (
                            <tr>
                                <td>{booking._id}</td>
                                <td>{booking.userid}</td>
                                <td>{booking.room}</td>
                                <td>{booking.fromdate}</td>
                                <td>{booking.todate}</td>
                                <td>{booking.status}</td>
                            </tr>
                        )
                    }))}
                </tbody>
            </table>
            </div>
        </div>
    );
}


export function Rooms()
{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [rooms , setrooms] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = (await axios.get("http://localhost:5000/api/rooms/getAllrooms")).data;
                const roomsArray = data.rooms;
                setrooms(roomsArray);
            } catch (error) {
                setError(true);
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData(); // Call the async function immediately
    } , []);
    return (
        <div className='row'>
            <div className='col-md-12'>
            <h1>Rooms</h1>
            {loading && (<Loader/>)}
            <table className='table table-border table-dark'>
                <thead className='bs'>
                    <tr>
                        <th>Room Id</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Rent Per Day</th>
                        <th>Max Count</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.length > 0 && (rooms.map(room =>{
                        return (
                            <tr>
                                <td>{room._id}</td>
                                <td>{room.name}</td>
                                <td>{room.type}</td>
                                <td>{room.rentperday}</td>
                                <td>{room.maxCount}</td>
                                <td>{room.phoneNumber}</td>
                            </tr>
                        )
                    }))}
                </tbody>
            </table>
            </div>
        </div>
    );
}


export function Users()
{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [users , setrooms] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = (await axios.get("http://localhost:5000/api/users/getallusers")).data;
                setrooms(data);
            } catch (error) {
                setError(true);
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData(); // Call the async function immediately
    } , []);
    
    return(
        <div className='row'>
            <div className='col-md-12'>
                <h1>Users</h1>
                <table className='table table-dark table-bordered'>
                     <thead>
                        <tr>
                            <th>User Id</th>
                            <th>User Name</th>
                            <th>Email</th>
                        </tr>
                     </thead>
                </table>
            </div>
        </div>
    );
}