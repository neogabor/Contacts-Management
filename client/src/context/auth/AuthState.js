import React, { useReducer } from 'react'
import axios from 'axios'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAN_ERRORS } from '../types'
import setAuthToken from '../../utils/setAuthToken'

const PROXY_URL = "http://localhost:5000"

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null,
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState)

    const loadUser = async () => {
        if(localStorage.token) {
            setAuthToken(localStorage.token)
        }

        try {
            const res = await axios.get(`${PROXY_URL}/api/auth`)

            dispatch({type: USER_LOADED, payload: res.data,})
        } catch (err) {
            dispatch({ type: AUTH_ERROR })
        }
    }

    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post(`${PROXY_URL}/api/users`, formData, config)

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })

        } catch (err) {
            console.log({err})
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            })
        }
    }

    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post(`${PROXY_URL}/api/auth`, formData, config)

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })

        } catch (err) {
            console.log({err})
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            })
        }
    }

    const logout = () => dispatch({ type: LOGOUT })

    const clearErrors = () => dispatch({ type: CLEAN_ERRORS })

    return (
    <AuthContext.Provider value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loadUser,
        register,
        login,
        logout,
        clearErrors,
    }}>
        {props.children}
    </AuthContext.Provider>)
}

export default AuthState