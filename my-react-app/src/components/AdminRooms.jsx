import { React, useState, useEffect } from "react"; // Remove 'React' import here
import styled from "styled-components";
import edit from "../assets/icons/edit.svg";
import deleteImage from "../assets/icons/delete.svg";
import plus from "../assets/icons/plus.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import DisplayRoom from "./DisplayRoom";
import { useRoomsContext } from "../contexts/RoomsContext";

// Rest of the code remains the same

const AdminRooms = () => {
  const { rooms, fetchRooms, setMode, handleUpdateDelete } = useRoomsContext();
  useEffect(() => {
    fetchRooms();
  }, []);
  return (
    <Rooms>
      <div className="container">
        <div className="left">
          <div className="left-container">
            <div
              className="left-container-item"
              onClick={() => setMode("Update")}
            >
              <img src={edit} alt="Edit" />
              <h3>Update</h3>
            </div>
            <div
              className="left-container-item"
              onClick={() => setMode("Delete")}
            >
              <img src={deleteImage} alt="Delete" />
              <h3>Delete</h3>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="right-top" style={{ marginTop: "10px" }}>
            <h2>Manage Rooms</h2>
            <Link
              style={{
                float: "right",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "5px",
                margin: "auto",
                borderRadius: "15px",
              }}
              className="btn btn-outline-primary"
              type="submit"
              to="addroom"
            >
              <img
                src={plus}
                alt="Plus"
                style={{ height: "50px", width: "30px" }}
              />
              Add Room
            </Link>
          </div>
          <div className="right-bottom">
            <div className="section">
              <div className="room-container">
                {rooms.map((room, index) => {
                  const { _id, roomNo, roomType, rate, image } = room;
                  return (
                    <DisplayRoom
                      _id={_id}
                      roomNo={roomNo}
                      roomType={roomType}
                      rate={rate}
                      image={image}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Rooms>
  );
};

const Rooms = styled.div`
  .container {
    position: relative;
    display: flex;
    height: 100%;
  }
  .left {
    width: 20%;
    overflow: hidden;
  }
  .right {
    width: 80%;
  }

  .left-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .left-container-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px;
    margin: auto;
    border-radius: 15px;
  }

  .left-container-item: hover {
    background-color: #e21bd7;
    color: #fff;
    transition: all 1s ease-in;
    cursor: pointer;
  }
  .left-container-item: hover .left {
    width: 20%;
  }
  .left-container-item img {
    width: 30px;
    height: 50px;
  }
  .left-container-item h3 {
    position: relative;
    margin-left: 5px;
    font-size: 16px;
    color: black;
  }
  .right-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 20%;
  }

  .right-bottom {
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    aligh-items: center;
  }

  .section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  .room-container {
    max-width: 100%;
    display: flex;
    flex-direction: row;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 968px) {
    .container {
      flex-direction: column;
    }
    .left,
    .right {
      width: 100%;
    }

    .left {
      height: 20%;
    }
    .right {
      height: 100%;
    }
    .right-top {
      width: 100%;
      align-items: center;
      margin-left: auto;
      margin-right: auto;
    }
    .left-container {
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;
    }
  }
`;
export default AdminRooms;
