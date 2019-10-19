import React, { Component } from 'react';
import { NavLink, NavItem } from 'reactstrap';
import { API } from '../API';
import './NavMenu.css';
import { Link } from 'react-router-dom';

const HiddenNavLink = () => (
    API.isAuthenticated()
        ? <NavItem><NavLink tag={Link} className="text-dark" to='/login' onClick={() => API.logout()}>Logout</NavLink></NavItem>
        : ''
);

export default HiddenNavLink;