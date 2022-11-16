import React, { useContext, Fragment } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ContactContext from '../../context/contact/contactContext'
import { ContactItem } from './ContactItem'

export const Contacts = () => {
  const { contacts, filtered } = useContext(ContactContext)

  if(!contacts.length) {
    return <h4>Please add a contact</h4>
  }

  const visibleContacts = filtered ?? contacts

  return (
    <Fragment>
      <TransitionGroup>
        {visibleContacts.map(contact => (
          <CSSTransition key={contact.id} timeout={500} classNames='item'>
            <ContactItem contact={contact} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Fragment>
  )
}