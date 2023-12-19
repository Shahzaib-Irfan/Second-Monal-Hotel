import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios'; // You can remove this line if you don't need to make HTTP requests

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
    cnic: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an HTTP POST request to add the employee
      const response = await axios.post('/addEmployee', formData);
      if (response.status === 200) {
        alert('Employee added successfully');
      } else {
        alert('Failed to add employee');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Error adding employee');
    }
  };

  return (
    <Container>
      <h2>Add Employee</h2>
      <Form action='/addEmployee' method='post'>
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
        <Form.Group controlId="cnic">
          <Form.Label>CNIC</Form.Label>
          <Form.Control
            type="text"
            name="cnic"
            value={formData.cnic}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Employee
        </Button>
      </Form>
    </Container>
  );
};

export default AddEmployee;
