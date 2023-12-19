import axios from "axios";
import React, { useEffect, useState } from "react";

const Book = () => {
  const [bookings, setBookings] = useState([]);
  let totalAccum = 0;

  useEffect(() => {
    const response = axios.get('/getAllBookings');
    response
      .then(success => {
        const { data } = success;
        setBookings(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <table className='table table-striped thead-dark table-bordered table-responsive'>
        <thead>
          <tr>
            <th>Booking Id</th>
            <th>Booking From</th>
            <th>Booking To</th>
            <th>Booking Room</th>
            <th>Booking Rent</th>
            <th>Booking Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings ? (
            bookings.map(book => {
              totalAccum += book.totalRent;
              return (
                <tr key={book._id}>
                  <td>{book._id}</td>
                  <td>{book.fromDate}</td>
                  <td>{book.toDate}</td>
                  <td>{book.room}</td>
                  <td>{book.totalRent}</td>
                  <td>{book.status}</td>
                </tr>
              );
            })
          ) : (
            <></>
          )}
        </tbody>
      </table>
      <p>Total Accumulated Rent: {totalAccum}</p>
    </>
  );
};

export default Book;
