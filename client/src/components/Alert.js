import React, { useEffect } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import '../styles/Alert.css'

const Alert = ({ alert, setAlert }) => {
  useEffect(() => {
    setTimeout(() => {
      setAlert(!alert)
    }, 2000)
  })

  return (
    <div className='alert basic-flex'>
      <span className='icon basic-flex'>
        <FaCheckCircle />
      </span>
      <p>Das Buch wurde erfolgreich hinzugefügt!</p>
    </div>
  )
}

export default Alert
