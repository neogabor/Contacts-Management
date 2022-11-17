import React, { useReducer } from 'react'
import axios from 'axios'
import ContactContext from './contactContext'
import ContactReducer from './contactReducer'
import { GET_CONTACTS, CLEAR_CONTACTS, ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, CONTACT_ERROR, FILTER_CONTACTS, SET_CURRENT, CLEAR_CURRENT, CLEAR_FILTER } from '../types'
const PROXY_URL = "http://localhost:5000"

const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null,
    }

    const [state, dispatch] = useReducer(ContactReducer, initialState)

    const getContacts = async () => {
        try {
            const res = await axios.get(`${PROXY_URL}/api/contacts`)
            dispatch({ type: GET_CONTACTS, payload: res.data })

        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        }
    }

    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        try {
            const res = await axios.post(`${PROXY_URL}/api/contacts`, contact, config)
            dispatch({ type: ADD_CONTACT, payload: res.data })

        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        }
    }

    const deleteContact = async id => {
        try {
            await axios.delete(`${PROXY_URL}/api/contacts/${id}`)
            dispatch({ type: DELETE_CONTACT, payload: id })

        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        }
    }

    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        try {
            const res = await axios.put(`${PROXY_URL}/api/contacts/${contact._id}`, contact, config)
            dispatch({ type: UPDATE_CONTACT, payload: res.data })

        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        }
    }

    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS })
    }

    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact })
    }

    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }

    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text })
    }

    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER })
    }

    return (
    <ContactContext.Provider value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getContacts,
        addContact,
        deleteContact,
        updateContact,
        clearContacts,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter,
    }}>
        {props.children}
    </ContactContext.Provider>)
}

export default ContactState