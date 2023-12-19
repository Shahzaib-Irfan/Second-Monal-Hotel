import React, { useState } from 'react'
import RoomEnlarged from './RoomEnlarged'
import { Link } from 'react-router-dom'


export default function Room({ room, fromDate, toDate }) {
    const [showModal, setShowModal] = useState(false);
    const roomRoute = `/book/${room._id}`

    const handleViewDetails = () => {
        setShowModal(true);
    };
    return (
        <div className='row justify-content-center bs'>
            <div className='col-md-4 float-right' style={{ marginTop: "2rem" }}>
                <img src={`/images/${room.imageurls[0]}`} alt='RoomText' className='small-img' />
            </div>
            <div className='col-md-7 room-info' style={{ marginTop: "2rem" }}>
                <h1 className='text-left'>{room.name}</h1>
                <h4>Max Count: {room.maxCount}</h4>
                <h4>Phone Number: {room.phoneNumber}</h4>
                <h4>Type : {room.type}</h4>
                <br />
                <div className='row'>
                    <div className='col-md-5 col-sm-12'>
                        <div style={{ float: "right" }}>
                            <div class="wrapper">
                                <div class="link_wrapper">
                                    <a className='button-wrapper' href="#" onClick={handleViewDetails}>View Details</a>
                                    <div class="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268.832 268.832">
                                            <path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-2'></div>
                    <div className='col-md-5 col-sm-12'>
                        <div style={{ float: "left" }}>
                            {(fromDate && toDate) ? (
                            <div class="wrapper">
                                <div class="link_wrapper">
                                    <a className='button-wrapper' href="" >
                                        <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
                                            Book Room
                                        </Link>
                                    </a>
                                    <div class="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268.832 268.832">
                                            <path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z" />
                                        </svg>
                                    </div>
                                </div>

                            </div>
                            ) : (<></>)}
                        </div>
                    </div>

                </div>

                {showModal &&
                    <RoomEnlarged
                        showParams={showModal} // Pass showModal as showParams
                        onHide={() => setShowModal(false)}
                        room={room}
                    />}

            </div>
        </div>
    )
}
