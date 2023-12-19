import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Cookies from 'js-cookie'

const ProfileBooking = ({ user }) => {
    const [bookings, setBookings] = useState([])
    const [showReviewModal, setShowReviewModal] = useState(false)
    const [reviewText, setReviewText] = useState('')
    const [selectedBookingId, setSelectedBookingId] = useState(null)

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.post('/getUserBooking', { userId: user._id })
                const { data } = response
                setBookings(data)
            } catch (error) {
                console.error('Error fetching bookings:', error)
            }
        }

        fetchBookings()
    }, [])

    const CancelBooking = async (id, roomId) => {
        try {
            const response = await axios.post('/cancelBookings', { bookingId: id, roomId: roomId })
            window.location.reload()
        } catch (error) {
            alert('Something went wrong, try again')
        }
    }

    const handleReviewSubmit = async () => {
        try {
            const response = await axios.post('/submitReview', {
                email : JSON.parse(Cookies.get('currentUserForHotelApp')).email,
                bookingId: selectedBookingId,
                review: reviewText
            })
            setShowReviewModal(false)
            window.location.reload()
            // Handle success, show a message or trigger a reload if necessary
        } catch (error) {
            console.error('Error submitting review:', error)
            // Handle error, show an error message
        }
    }

    return (
        <div>
            {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                    <Card key={index} className='col-sm-12 mb-4 justify-content-center'>
                        <Card.Body>
                        <h2>Booking Number : {index + 1}</h2>
                            <p> <b>Booking From:</b> {booking.fromDate}</p>
                            <p><b>Booking To:</b> {booking.toDate}</p>
                            <p><b>Booking Period:</b> {booking.totalDays}</p>
                            <p><b>Booking Rent: </b> {booking.totalRent}</p>
                            {/* ... */}
                            <h1>Status : {booking.status === 'booked' ? (
                                <Badge pill bg="success">
                                    {booking.status}
                                </Badge>
                            ) : (
                                <Badge pill bg="danger">
                                    Cancelled
                                </Badge>
                            )}</h1>

                            {booking.status === 'booked' ? (
                                <div style={{ float: "right" }}>
                                    <button className='btn btn-primary m-3' onClick={() => {
                                        CancelBooking(booking._id, booking.roomId)
                                    }}>Cancel Booking</button>
                                    <button
                                        className='btn btn-primary'
                                        onClick={() => {
                                            setSelectedBookingId(booking._id)
                                            setShowReviewModal(true)
                                        }}
                                    >
                                        Leave a Review
                                    </button>
                                </div>
                            ) : (
                                <div style={{float:'right'}}>
                                    <button
                                        className='btn btn-primary'
                                        onClick={() => {
                                            setSelectedBookingId(booking._id)
                                            setShowReviewModal(true)
                                        }}
                                    >
                                        Leave a Review
                                    </button>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <p>No bookings available.</p>
            )}

            <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)}>
                <Modal.Header closeButton={ () =>{setShowReviewModal(false)}}>
                    <Modal.Title>Leave a Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Write your review here..."
                        rows={4}
                        cols={50}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowReviewModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleReviewSubmit}>
                        Submit Review
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ProfileBooking;
