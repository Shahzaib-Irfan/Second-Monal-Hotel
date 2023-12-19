import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import Logo from '../static-imgs/logo-final.png'
import Book from '../components/BookingAdmin'
import Room from '../components/RoomsAdmin'
import AddRoom from '../components/AddRoom'
import AddEmployee from '../components/AddEmployee'
import axios from 'axios'


const { TabPane } = Tabs

const AdminHomeScreen = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
        <div className="container">
          <Navbar.Toggle aria-controls="Navbar" />
          <Navbar.Brand href="#imageNav">
            <img src={Logo} id='imageNav' height={'60'} alt='navbar-logo' />
          </Navbar.Brand>
          <Navbar.Collapse id="Navbar">
            <Nav className="ml-auto">
              <>
                <Nav.Link href="/loginScreen" className='nav-link'>Log out</Nav.Link>
              </>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <div className='tabs-profile bs'>
        <h2>Cuarto App - Admin Panel</h2>
        <Tabs defaultActiveKey='1'>
          <TabPane tab='All Rooms' key={1}>
            <Room />
          </TabPane>
          <TabPane tab='All Bookings' key={2}>
            <Book />
          </TabPane>
          <TabPane tab='Add Employee' key={3}>
            <AddEmployee />
          </TabPane>
          <TabPane tab='All Employee' key={4}>
            <Employees />
          </TabPane>
          <TabPane tab='Add Room' key={5}>
            <AddRoom />
          </TabPane>
          <TabPane tab='Log out' key={6}>
            <a href='/loginScreen'>Log Out</a>
          </TabPane>
        </Tabs>
      </div>
    </>
  )
}



export const Employees = () => {
  const [employees, setEmployees] = useState([])
  useEffect(() => {
    const response = axios.get('/getEmployee')
    response.then(success => {
      const { data } = success
      setEmployees(data)
    })
  }, [])
  return (
    <>
      <table className='table table-striped thead-dark table-bordered'>
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee Name</th>
            <th>Employee Phone</th>
            <th>Employee CNIC</th>
          </tr>
        </thead>
        <tbody>
          {employees ? (
            employees.map(emp => {
              return (
                <tr key={emp._id}>
                  <td>{emp._id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.cnic}</td>
                </tr>
              );
            })
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </>
  )
}

export default AdminHomeScreen
