import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddRoom = () => {
  const [formData, setFormData] = useState({
    name: '',
    rentPerDay: '',
    phoneNumber: '',
    maxCount: '',
    type: 'delux',
    description: '',
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const images = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      images,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      /* const formDataToSend = new FormData();
      for (const key in formData) {
        if (key === 'images') {
          formData[key].forEach((image) => {
            formDataToSend.append(key, image);
          });
        } else {
          formDataToSend.append(key, formData[key]);
        }
      } */

      /* console.log(formData)

      const response = await fetch('/addRooms', {
        method: 'POST',
        body: formData,
      }); */

     /*  if (response.ok) {
        alert('Saved successfully');
      } else {
        alert('Something Went Wrong, Try again');
      }
    } catch (error) {
      console.error('Error sending data:', error);*/
    }finally{
      
    }
};

  return (
    <Form action='http://localhost:4000/addRooms' method='post' encType="multipart/form-data">
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="rentPerDay">
        <Form.Label>Rent Per Day</Form.Label>
        <Form.Control
          type="number"
          name="rentPerDay"
          value={formData.rentPerDay}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="phoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="maxCount">
        <Form.Label>Max Count</Form.Label>
        <Form.Control
          type="number"
          name="maxCount"
          value={formData.maxCount}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="type">
        <Form.Label>Type</Form.Label>
        <Form.Control
          as="select"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
        >
          <option value="delux">Delux</option>
          <option value="non-delux">Non-Delux</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="images">
        <Form.Label>Images</Form.Label>
        <Form.Control
          type="file"
          name="images"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddRoom;
