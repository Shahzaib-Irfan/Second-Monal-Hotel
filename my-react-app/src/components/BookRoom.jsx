import { React, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useRoomsContext } from "../contexts/RoomsContext";
import Loading from "../constants/Loading";
import styled from "styled-components";

const BookRoom = () => {
  const [overlapped, setOverlapped] = useState(false);
  const [personName, setPersonName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [arrivalDate, setArrivalDate] = useState(null);
  const [arrivalTime, setArrivalTime] = useState("");
  const [departureDate, setDepartureDate] = useState(null);
  const [departureTime, setDepartureTime] = useState("");
  const [children, setChildren] = useState(0);
  const [adults, setAdults] = useState(0);

  const { id } = useParams();
  const {
    setLoading,
    loading,
    rooms,
    setRooms,
    singleRoom,
    fetchSingleRoom,
    roomId,
    setRoomId,
    bookedRooms,
    setBookedRooms,
  } = useRoomsContext();

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/getSingleRoom/${id}`);
      const data = await response.json();
      setRooms(data);
      setRoomId(data._id);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const fetchBookedRooms = async (roomId) => {
    try {
      const response = await fetch(
        `https://smoggy-cheddar-banon.glitch.me/getBookedRoom?id=${roomId}`
      );
      const data = await response.json();
      console.log("Booked Rooms:", data);
      setBookedRooms(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSingleRoom(id);
  }, [id]);
  // useEffect(() => {
  //   fetchBookedRooms(roomId);
  // }, [roomId]);

  function createBooking(
    arrivalDate,
    arrivalTime,
    departureDate,
    departureTime
  ) {
    const arrival = new Date(`${arrivalDate}T${arrivalTime}`);
    const departure = new Date(`${departureDate}T${departureTime}`);

    return { arrival, departure };
  }

  function checkOverlap(booking1, booking2) {
    const isArrivalEqual =
      booking1.arrival.getTime() === booking2.arrival.getTime();
    const isDepartureEqual =
      booking1.departure.getTime() === booking2.departure.getTime();

    if (isArrivalEqual && isDepartureEqual) {
      return true; // Both bookings start and end on the same date and time
    }

    return (
      (booking1.arrival >= booking2.arrival &&
        booking1.arrival <= booking2.departure) ||
      (booking1.departure >= booking2.arrival &&
        booking1.departure <= booking2.departure) ||
      (booking2.arrival >= booking1.arrival &&
        booking2.arrival <= booking1.departure) ||
      (booking2.departure >= booking1.arrival &&
        booking2.departure <= booking1.departure)
    );
  }

  const handleOverlappedCheck = () => {
    if (
      arrivalDate != null &&
      arrivalTime != "" &&
      departureDate != null &&
      departureTime != ""
    ) {
      for (const existingBooking of bookedRooms) {
        const newBooking = createBooking(
          arrivalDate,
          arrivalTime,
          departureDate,
          departureTime
        );
        const existingBookingMadeUp = createBooking(
          existingBooking.arrivalDate.slice(0, 10),
          existingBooking.arrivalTime,
          existingBooking.departureDate.slice(0, 10),
          existingBooking.departureTime
        );
        if (checkOverlap(newBooking, existingBookingMadeUp)) {
          setOverlapped(true);
          return;
        }
        setOverlapped(false);
      }
    }
  };

  useEffect(() => {
    handleOverlappedCheck();
  }, [arrivalDate, arrivalTime, departureDate, departureTime]);

  if (loading) {
    return <Loading />;
  }
  if (!singleRoom) {
    return <h2 className="section-title">no room to display</h2>;
  } else {
    const { roomNo, image, roomType, description, rate } = singleRoom;
    return (
      <Wrapper>
        <section className="section room-section">
          <Link to="/viewrooms" className="btn btn-primary">
            Back
          </Link>
          <h2 className="section-title">{roomNo}</h2>
          <div className="room">
            <img
              src={`http://localhost:5000/images/${image}`}
              alt={roomNo}
            ></img>
            <div className="content-section">
              <div className="room-info">
                <p>
                  <span className="room-data">name :</span>
                  {roomNo}
                </p>
                <p>
                  <span className="room-data">category :</span>
                  {roomType}
                </p>
                <p>
                  <span className="room-data">info :</span>
                  {description}
                </p>
                <p>
                  <span className="room-data">price :</span>
                  {"Rs. " + rate + "/-"}
                </p>
              </div>
              <div className="user-info">
                <h4>User Information</h4>
                <hr style={{ marginTop: "-5px" }} />
                <form
                  action={`http://localhost:5000/bookingApi/bookroom/${singleRoom["_id"]}`}
                  method="post"
                >
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      id="floatingInput"
                      placeholder="Your Name Here"
                      onChange={(e) => setPersonName(e.target.value)}
                    />
                    <label for="floatingInput">Your Name</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      name="email"
                      class="form-control"
                      id="floatingInputEmail"
                      placeholder="Your Email Here"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label for="floatingInputEmail">Email</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      name="contact"
                      class="form-control"
                      id="floatingInputContact"
                      placeholder="Your Contact Here"
                      onChange={(e) => setContact(e.target.value)}
                    />
                    <label for="floatingInputContact">Contact</label>
                  </div>
                  <div class="form-floating mb-3">
                    <div style={{ display: "inline-block" }}>
                      <label
                        style={{ fontSize: "12px" }}
                        for="floatingInputArrivalDate"
                      >
                        Arrival Date
                      </label>
                      <input
                        style={{ width: "120px", marginLeft: "3px" }}
                        type="date"
                        name="dateArrival"
                        id="floatingInputArrivalDate"
                        onChange={(e) => setArrivalDate(e.target.value)}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        for="floatingInputArrivalTime"
                      >
                        Time
                      </label>
                      <input
                        type="time"
                        name="timeArrival"
                        id="floatingInputArrivalTime"
                        onChange={(e) => setArrivalTime(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="form-floating mb-3">
                    <div style={{ display: "inline-block" }}>
                      <label
                        style={{ fontSize: "12px" }}
                        for="floatingInputArrivalDate"
                      >
                        Departure Date
                      </label>
                      <input
                        style={{ width: "120px", marginLeft: "3px" }}
                        type="date"
                        name="dateDeparture"
                        id="floatingInputDepartureDate"
                        onChange={(e) => setDepartureDate(e.target.value)}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        for="floatingInputDepartureTime"
                      >
                        Time
                      </label>
                      <input
                        type="time"
                        name="timeDeparture"
                        id="floatingInputDepartureTime"
                        onChange={(e) => setDepartureTime(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="form-floating mb-3">
                    <input
                      type="number"
                      name="children"
                      class="form-control"
                      id="floatingInputChildren"
                      placeholder="No. od Children"
                      onChange={(e) => setChildren(e.target.value)}
                    />
                    <label for="floatingInputChildren">No. of Children</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input
                      type="number"
                      name="adults"
                      class="form-control"
                      id="floatingInputAdults"
                      placeholder="No. od Adults"
                      onChange={(e) => setAdults(e.target.value)}
                    />
                    <label for="floatingInputAdults">No. of Adults</label>
                  </div>
                  <div>
                    {overlapped ? (
                      <p
                        style={{
                          marginTop: "10px",
                          color: "red",
                          fontSize: "11px",
                        }}
                      >
                        This room is already booked in this duration
                      </p>
                    ) : null}
                  </div>

                  <div style={{ margin: "10px 0px 0px 10px" }}></div>
                  {overlapped ? null : (
                    <button className="cool-button" type="submit">
                      Book Room
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  .room-section {
    text-align: center;
  }

  .section {
    padding: 5rem 0;
  }

  .section-title {
    font-size: 2rem;
    text-transform: capitalize;
    letter-spacing: 0.3rem;
    text-align: center;
    margin-bottom: 3.5rem;
    margin-top: 1rem;
  }

  .room {
    width: 85vw;
    max-width: 1170px;
    margin: 0 auto;
    text-align: left;
    height: auto;
  }

  .room img {
    border-radius: 0.25rem;
    width: 100%;
    height: 400px;
  }

  .room p {
    font-weight: bold;
    text-transform: capitalize;
    line-height: 1.8;
  }

  .room span {
    margin-right: 0.5rem;
  }
  .user-info {
    max-width: 85vh;
  }
  .room-data {
    background: #d4e6a5;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    color: #476a2e;
  }

  .content-section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .room-info {
    padding-top: 2rem;
  }

  @media screen and (min-width: 992px) {
    .room {
      display: grid;
      grid-template-columns: 2fr 3fr;
      gap: 3rem;
      align-items: center;
    }

    .room-info {
      padding-top: 0;
    }
  }

  .btn-primary {
    background: #476a2e;
    color: #fff;
    border-color: transparent;
  }

  .btn-primary:hover {
    background: #d4e6a5;
    color: #476a2e;
  }
  .btn,
  .btn-white,
  .btn-primary {
    text-transform: uppercase;
    letter-spacing: 0.3rem;
    color: #476a2e;
    border: 2px solid #476a2e;
    padding: 0.45rem 0.8rem;
    display: inline-block;
    transition: all 0.3s linear;
    cursor: pointer;
    font-size: 0.8rem;
    background: transparent;
    border-radius: 0.25rem;
    display: inline-block;
  }

  .btn:hover {
    background: #476a2e;
    color: #fff;
  }
  .cool-button {
    display: inline-block;
    padding: 12px 24px;
    background-color: #4caf50; /* Green background color */
    color: #fff; /* Text color */
    border: none;
    border-radius: 30px;
    font-size: 16px;
    cursor: pointer;
    outline: none;
    transition: background-color 0.3s ease;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  }

  /* Gradient background effect */
  .cool-button {
    background-image: linear-gradient(to right, #4caf50, #63a69f);
  }

  /* Hover effect */
  .cool-button:hover {
    background-image: linear-gradient(to right, #63a69f, #4caf50);
  }

  /* Optional: Add a box-shadow on hover for an additional effect */
  .cool-button:hover {
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
  }
`;

export default BookRoom;
