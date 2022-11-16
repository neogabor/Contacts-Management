import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

export const PrivateRoute = () => {
  const { isAuthenticated, loading } = useContext(AuthContext)

  return !isAuthenticated && !loading ? (
            <Navigate to='/login' />
        ) : (
            <Outlet />
        )
}
