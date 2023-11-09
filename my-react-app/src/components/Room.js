import React , {useState} from 'react'
import {Modal , Button , Carousel} from 'react-bootstrap'
function Room({room , index}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <div className='row bs'>
        <div className='col-md-4'>
            <img src={room.imageUrls[0]} className='smallimg'/>
        </div>
        <div className='col-md-7'>
            <h2>{room.name}</h2>
            <b>
                <p>Max Count : {room.maxCount}</p>
                <p>phone Number : {room.phoneNumber}</p>
                <p>Type : {room.type}</p>
            </b>
            <div style={{ float: 'right' }} className='btn'>
                <button className='btn btn-primary' style={{ backgroundColor: 'black', color: 'white' , boxShadow: 'none'}} onClick={handleShow}>View Details</button>
            </div>
        </div>

        {/* modal code */}{/* <Button variant="primary" onClick={handleShow}>
            Launch demo modal
        </Button> */}

        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
            <Modal.Title>{room.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Carousel prevLabel='' nextLabel=''> 
                {room.imageUrls.map((url, index) => (
                    <Carousel.Item key={index}>
                    <img className='d-block w-100 bigimg'  src={url} alt={`slide-${index}`} style={{ borderRadius: '5px' }}/>
                    </Carousel.Item>
                ))}
                </Carousel>
                <p>{room.Room_description}</p>
            </Modal.Body>          
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    </div>
    
  )
}

export default Room