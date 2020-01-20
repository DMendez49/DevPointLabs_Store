import React, { useState, useEffect, useContext } from 'react';
import { withRouter, } from 'react-router-dom';
import { AuthConsumer } from '../providers/AuthProvider';
import { AuthContext } from '../providers/AuthProvider';
import { Link, NavLink, } from 'react-router-dom';
import { Button, Icon, Dropdown, } from "semantic-ui-react";
import minilogo from '../components/Images/DevPoint_Labs.png'
import styled from "styled-components";
import '../App.css';
import axios from 'axios';

const Navbar = (props) => {
  const [selection, setSelection] = useState('')
  const [tShirts, setTshirts] = useState({})
  const [hoodies, setHoodies] = useState({})
  const [hats, setHats] = useState({})
  const [stickers, setStickers] = useState({})
  const context = useContext(AuthContext)


  useEffect(() => {
    axios.get("/api/categories")
      .then(res => {
        setTshirts(res.data[0])
        setHats(res.data[2])
        setHoodies(res.data[1])
        setStickers(res.data[3])
      })
  }, []);

  const options = () => {
    if (context.user) {
      return (
        [
          { key: 1, text: 'Hats', value: 'Hats' },
          { key: 2, text: 'Stickers', value: 'Stickers' },
          { key: 3, text: 'Contact', value: 'Contact' },
          { key: 4, text: 'AdminPage', value: 'AdminPage' },
          { key: 5, text: 'Register', value: 'Register' },
          { key: 6, text: 'Logout', value: 'Logout' },
        ]
      )
    } else {
      return (
        [
          { key: 1, text: 'Hats', value: 'Hats' },
          { key: 2, text: 'Stickers', value: 'Stickers' },
          { key: 3, text: 'Contact', value: 'Contact' },
          { key: 4, text: 'AdminPage', value: 'AdminPage' },
          { key: 5, text: 'Register', value: 'Register' },
          { key: 6, text: 'Login', value: 'Login' },
        ]
      )
    }
  }

  const handleChange = (e, { value, }, ) => setSelection(value)

  const userOptions = () => {
    switch (selection) {
      case "Hats":
        props.history.push(`/categories/${hats.id}`)
        setSelection('')
        break;

      case "Stickers":
        props.history.push(`/categories/${stickers.id}`)
        setSelection('')
        break;

      case 'Contact':
        props.history.push('/Contact')
        setSelection('')
        break;

      case 'AdminPage':
        props.history.push('/AdminPage')
        setSelection('')
        break;

      case "Register":
        props.history.push('/Register')
        setSelection('')
        break;
      case (context.user === null && "Login"):
        props.history.push('/login')
        setSelection('')
        break;
      case (context.user && "Logout"):
        context.handleLogout(props.history)
        setSelection('')
        break;
    }
  }


  return (
    <AuthConsumer>
      {auth => (
        <div id='whole navbar'>
          <div id='left side navbar'>
            <div style={home}>
              <NavLink
                to="/" exact
                activeClassName="active"
                className="nav-link"
              >
                <div style={text}>
                  <img
                    src={minilogo}
                    height="60"
                    width="60"
                    class="navbar"
                  />
                  .SHOP( )
                </div>
              </NavLink>
            </div>
          </div>
          <div id='right side navbar' style={cust}>
            <div>
              <NavLink to='/' exact>
                <h3 style={text}>
                  All Products
               </h3>
              </NavLink>
            </div>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <div>
              <NavLink to={`/categories/${tShirts.id}`}>
                <h3 style={text}>
                  T-Shirts
               </h3>
              </NavLink>
            </div>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <div>
              <NavLink to={`/categories/${hoodies.id}`}>
                <h3 style={text}>
                  Hoodies
               </h3>
              </NavLink>
            </div>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            {selection != '' ? userOptions() : null}
            <div style={lift} >
              <Dropdown
                style={text}
                text='More'
                as="h3"
                options={options()}
                onChange={handleChange}
                value={selection}
                simple item
              />
            </div>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <div>
              <Link
                to="/Cart"
                active={props.location.pathname === '/Cart'}
              >
                <h3 style={text}>
                  <Icon
                    name='cart arrow down'>
                  </Icon>
                  Cart
              </h3>
              </Link>
            </div>
          </div>
        </div>
      )}
    </AuthConsumer>
  )
}

const cust = {
  display: 'flex',
  paddingBottom: '55px',
  backgroundColor: 'white',
  color: 'black',
  fontSize: '30px',
  justifyContent: 'flex-End',
  paddingRight: '150px',
}

const home = {
  backgroundColor: 'white',
  paddingTop: '60px',
  paddingLeft: '105px',
  color: 'black',
  fontSize: '27px'
}

const text = {
  color: 'black',
}

const lift = {
  position: 'realitive',
}

export default withRouter(Navbar)



