import './App.css';
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
 const NavbarMenu : React.FC = () => {
     return (
         <Navbar bg="link" expand="md" >
             <Navbar.Brand href="#">Climate App-air quality measurements</Navbar.Brand>
             <Navbar.Toggle aria-controls="basic-navbar-nav" />
             <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                 <Nav className="ml-auto hamburger" >
                     <Nav.Link href="#">Home</Nav.Link>
                     <Nav.Link href="#">Contact</Nav.Link>
                      </Nav>
       
             </Navbar.Collapse>
         </Navbar>
        )
}
export default NavbarMenu