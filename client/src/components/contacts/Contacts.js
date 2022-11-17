import React, { useContext, Fragment, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ContactContext from '../../context/contact/contactContext'
import { Spinner } from '../layout/Spinner'
import { ContactItem } from './ContactItem'

export const Contacts = () => {
  const { contacts, filtered, getContacts, loading } = useContext(ContactContext)

  useEffect(() => {
    getContacts()
    //eslint-disable-next-line
  }, [])

  if(contacts && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>
  }

  const visibleContacts = filtered ?? contacts

  return (
    <Fragment>
      {contacts && !loading ? (
        <TransitionGroup>
          {visibleContacts.map(contact => (
            <CSSTransition key={contact._id} timeout={500} classNames='item'>
              <ContactItem contact={contact} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : <Spinner />}
    </Fragment>
  )
}
