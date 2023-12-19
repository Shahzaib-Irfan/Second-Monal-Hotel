import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel'
import CarouselItem from 'react-bootstrap/esm/CarouselItem';

function RoomEnlarged({ room, showParams, onHide }) {
    return (
        <Modal show={showParams} onHide={onHide} size={'md'}>
            <Modal.Header closeButton>
                <Modal.Title>{room.name}</Modal.Title>
            </Modal.Header>



            <Modal.Body>

                <Carousel style={{outline:"none"}}>
                    {room.imageurls.map(imageUrl => {
                        return <CarouselItem style={{outline:"none"}}>
                            <img className="d-block w-100 big-image"
                                src={`/images/${imageUrl}`}
                                style={{outline:"none"}}
                            />
                        </CarouselItem>
                    })}
                </Carousel>
                <p>{room.description}</p>
            </Modal.Body>



            <Modal.Footer>
                <Button variant="primary" style={{ backgroundColor: "#843ac1" }} onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RoomEnlarged;
