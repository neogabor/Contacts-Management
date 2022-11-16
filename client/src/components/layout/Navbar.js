import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

export const Navbar = ({ title }) => {
  const { isAuthenticated, logout, user } = useContext(AuthContext)

  const onLogout = () => {
    logout()
  }

  const AuthLinks = () => (
    <Fragment>
        <li>Hello {user && user.name}</li>
        <li><a href='#!' onClick={onLogout}><span>Logout</span></a></li>
    </Fragment>
  )

  const GuestLinks = () => (
    <Fragment>
        <li>
            <Link to='/register'>Register</Link>
        </li>
        <li>
            <Link to='/login'>Login</Link>
        </li>
    </Fragment>
  )

  return (
    <div className='navbar bg-primary'>
        <h1>{title}</h1>
        <ul>
            {isAuthenticated ? <AuthLinks /> : <GuestLinks />}
        </ul>
    </div>
  )
}

Navbar.propTypes = ({
    title: PropTypes.string.isRequired,
})

Navbar.defaultProps = {
    title: 'Contact Keeper',
}
