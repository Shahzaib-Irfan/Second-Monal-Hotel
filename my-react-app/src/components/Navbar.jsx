import React, {useState,useEffect} from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import Logo from '../static-imgs/logo-final.png'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Cookies from 'js-cookie'

export default function AppNavbar() {
    const user = Cookies.get("currentUserForHotelApp");
    const currentUser = user ? JSON.parse(user) : null;
    
   
    return (
        <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
            <div className="container">
                <Navbar.Toggle aria-controls="Navbar" />
                <Navbar.Brand href="#imageNav">
                    <img src={Logo} id='imageNav' height={'60'} alt='navbar-logo' />
                </Navbar.Brand>
                <Navbar.Collapse id="Navbar">
                    <Nav className="ml-auto">
                        {currentUser ? (<>
                            <DropdownButton title={currentUser.name}>
                                <Dropdown.Item href="/profileScreen">Profile</Dropdown.Item>
                                <Dropdown.Item href="/home">Home</Dropdown.Item>
                                <Dropdown.Item href="/loginScreen" onClick={() =>{
                                    Cookies.remove('currentUserForHotelApp')
                                }}>Logout</Dropdown.Item>
                            </DropdownButton>
                        </>) : (
                            <>
                                <Nav.Link href="/registerScreen" className='nav-link'>Register</Nav.Link>
                                <Nav.Link href="/loginScreen" className='nav-link'>Login</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    )
}