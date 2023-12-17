import { React, createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const RoomsContextProvider = createContext();

const RoomsContext = ({ children }) => {
  //const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [pendingBookings, setPendingBookings] = useState([]);
  const [approvedBookings, setApprovedBookings] = useState([]);
  const [bookedRooms, setBookedRooms] = useState([]); // this state is for the rooms which is booked and is used to check overlapping for that new room bookings
  const [roomId, setRoomId] = useState("");
  const [mode, setMode] = useState("none");
  const [loading, setLoading] = useState(false);
  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://smoggy-cheddar-banon.glitch.me/getRooms"
      );
      const data = await response.data;
      setRooms(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching rooms:", error);
    }
  };

  const fetchFeaturedRooms = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://smoggy-cheddar-banon.glitch.me/featured"
      );
      const data = await response.data;
      setFeatured(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching rooms:", error);
    }
  };
  const fetchPendingBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://smoggy-cheddar-banon.glitch.me/getPendingBookings"
      );
      const data = await response.data;
      console.log(data);
      setPendingBookings(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching bookings:", error);
    }
  };
  const fetchApprovedBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://smoggy-cheddar-banon.glitch.me/getApprovedBookings"
      );
      const data = await response.data;
      setApprovedBookings(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching bookings:", error);
    }
  };
  const fetchSingleApprovedRoom = async (id) => {
    try {
      console.log("id", id);
      setLoading(true);
      const response = await fetch(
        `https://smoggy-cheddar-banon.glitch.me/getSingleApprovedBooking?id=${id}`
      );
      const data = await response.json();
      setApprovedBookings(data);
      setRoomId(data[0].roomId);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    console.log(roomId);
  }, [roomId]);
  const handleUpdateDelete = async (id) => {
    if (mode === "Update") {
      // try {
      //   const response = await axios.get(
      //     `http://localhost:4000/UpdateRoom?id=${id}`
      //   );
      // } catch (error) {
      //   console.error("Error updating room:", error);
      // }
    } else if (mode === "Delete") {
      try {
        const response = await axios.get(
          `https://smoggy-cheddar-banon.glitch.me/deleteRoom?id=${id}`
        );
      } catch (error) {
        console.error("Error deleting room:", error);
      }
    }
  };
  return (
    <RoomsContextProvider.Provider
      value={{
        rooms,
        fetchRooms,
        setLoading,
        loading,
        setRooms,
        mode,
        setMode,
        handleUpdateDelete,
        pendingBookings,
        fetchPendingBookings,
        approvedBookings,
        fetchApprovedBookings,
        setApprovedBookings,
        fetchSingleApprovedRoom,
        roomId,
        setRoomId,
        bookedRooms,
        setBookedRooms,
        featured,
        fetchFeaturedRooms,
      }}
    >
      {children}
    </RoomsContextProvider.Provider>
  );
};

export const useRoomsContext = () => {
  return useContext(RoomsContextProvider);
};
export { RoomsContext, RoomsContextProvider };
