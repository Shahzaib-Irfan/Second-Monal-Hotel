import axios from "axios"
import React, { useEffect, useState } from "react"

const Room = () => {
    const [rooms, setRooms] = useState([])
    useEffect(() => {
      const response = axios.get('/getRooms')
      response.then(success => {
        const { data } = success
        setRooms(data)
      }).catch(error => {
        console.log(error)
      })
    }, [])
    return (
      <>
        <table className='table table-striped thead-dark table-bordered'>
          <thead>
            <tr>
              <th>Room Id</th>
              <th>Room Type</th>
              <th>Room Name</th>
              <th>Room Max Count</th>
              <th>Room Rent</th>
            </tr>
          </thead>
          <tbody>
            {rooms ? rooms.map(room => (
              <tr>
                <td>{room._id}</td>
                <td>{room.type}</td>
                <td>{room.name}</td>
                <td>{room.maxCount}</td>
                <td>{room.rentPerDay}</td>
              </tr>
            )) : (<></>)}
          </tbody>
        </table>
      </>
    )
}
export default Room