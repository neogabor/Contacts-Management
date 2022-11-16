import React, { useContext, useEffect, useRef } from 'react'
import ContactContext from '../../context/contact/contactContext'

export const ContactFilter = () => {
  const { filterContacts, clearFilter, filtered } = useContext(ContactContext)
  const text = useRef('')

  useEffect(() => {
    if(!filtered) {
        text.current.value = ''
    }
  })

  const onChange = e => {
    if(text.current.value) {
        filterContacts(e.target.value)
    } else {
        clearFilter()
    }
  }

  return (
    <form>
        <input ref={text} type='text' placeholder='Filter Contacts...' onChange={onChange}/>
    </form>
  )
}
