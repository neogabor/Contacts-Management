import React, { useReducer } from 'react'
import {v4} from 'uuid'
import ContactContext from './contactContext'
import ContactReducer from './contactReducer'
import { ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, FILTER_CONTACTS, SET_CURRENT, CLEAR_CURRENT, CLEAR_FILTER } from '../types'

const ContactState = props => {
    const initialState = {
        contacts: [{
            id: 2,
            name: 'ggg',
            email: 'eee@gg.gg',
            phone: '21212121',
            type: 'personal',
        }],
        current: null,
        filtered: null,
    }

    const [state, dispatch] = useReducer(ContactReducer, initialState)

    const addContact = contact => {
        contact.id = v4()
        dispatch({ type: ADD_CONTACT, payload: contact })
    }

    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id })
    }

    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact })
    }

    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }

    const updateContact = contact => {
        dispatch({ type: UPDATE_CONTACT, payload: contact })
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
        addContact,
        deleteContact,
        updateContact,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter,
    }}>
        {props.children}
    </ContactContext.Provider>)
}

export default ContactState