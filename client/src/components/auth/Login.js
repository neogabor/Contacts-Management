import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContex'

export const Login = () => {
  const { login, error, clearErrors, isAuthenticated } = useContext(AuthContext)
  const { setAlert } = useContext(AlertContext)

  const navigate = useNavigate()

  useEffect(() => {
    if(isAuthenticated) {
      navigate('/')
    }

    if(error === 'Invalid Credentials') {
      setAlert(error, 'danger')
      clearErrors()
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, navigate])

  const [user, setUser] = useState({
    email:'',
    password: '',
  })

  const { email, password } = user

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    login({
      email,
      password,
    })
  } 

  return (
    <div className='form-container'>
        <h1>
            Account <span className='text-primary'>Login</span>
        </h1>
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label htmlFor='email'>Email Address</label>
                <input type='email' name='email' value={email} onChange={onChange} required/>
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' value={password} onChange={onChange} required/>
            </div>
            <input type='submit' value='Login' className='btn btn-primary btn-block' />
        </form>
    </div>
  )
}
