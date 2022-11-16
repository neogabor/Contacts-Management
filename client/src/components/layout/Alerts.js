import React, { useContext } from 'react'
import AlertContext from '../../context/alert/alertContex'

export const Alerts = () => {
  const { alerts } = useContext(AlertContext)
  
  return !!alerts.length && alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.type}`}>
            {alert.msg}
        </div>
    ))
}
