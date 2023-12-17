import { React, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRoomsContext } from "../../contexts/RoomsContext";
const Room = ({ _id, roomNo, roomType, rate, image }) => {
  const { handleUpdateDelete, mode } = useRoomsContext();
  const [bookingRoomStatus, setBookingRoomStatus] = useState(true);
  const fetchBookingRoom = async (_id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/getBookedRoom?id=${_id}`
      );
      const data = await response.json();
      if (data.length >= 1) {
        setBookingRoomStatus(false);
        return true;
      } else {
        setBookingRoomStatus(true);
        return false;
      }
      //setBookingRoom(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBookingRoom(_id);
  }, [_id]);
  return (
    <>
      <RoomWrapper>
        <div className="room-box">
          {bookingRoomStatus ? (
            <div className="head-tag">Available</div>
          ) : (
            <div className="head-tag">Limited Dates</div>
          )}
          <img
            onClick={() => handleUpdateDelete(_id)}
            src={`http://localhost:5000/images/${image}`}
            alt={roomNo}
            style={{ cursor: "pointer" }}
          />
          <div className="room-box-footer">
            <p style={{ color: "green" }}>{roomType}</p>
            <p style={{ marginLeft: "40px" }}>{"Rs. " + rate + "/-"} </p>
          </div>
          <div>
            <Link to={`/viewrooms/${_id}`} className="btn">
              Details
            </Link>
            <Link to={`/viewrooms/bookroom/${_id}`} className="btn">
              Book
            </Link>
          </div>
        </div>
      </RoomWrapper>
    </>
  );
};

const RoomWrapper = styled.div`
  .head-tag {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #ebd7cf;
    padding: 5px;
    border-radius: 5px;
  }
  .room-box {
    width: 100%;
    margin: 6px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }

  .room-box img {
    height: 70%;
    width: 100%;
    object-fit: cover;
    border-radius: 5px 5px 0 0;
  }

  .room-box-footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    gap: 2;
  }
  .btn {
    font-size: 1rem;
    padding: 0.25rem 0.5rem;
  }
  @media (max-width: 768px) {
    .room-box {
      width: 100%;
    }
  }
`;
export default Room;
