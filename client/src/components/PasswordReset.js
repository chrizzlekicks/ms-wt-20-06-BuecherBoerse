import React from 'react'
import Form from './Form'
import InputField from './InputField'
import SigninBtn from './SigninBtn'
import { useAuthContext } from '../context/AuthContext'

const PasswordReset = () => {
  const { backToLoginTab } = useAuthContext()
  return (
    <>
      <Form className='form-center'>
        <div className='title'>
          <h3>Passwort Reset</h3>
          <p>Gib hier deine Email ein und wir schicken dir einen Reset-Link</p>
        </div>
        <section className='form'>
          <InputField
            type='text'
            htmlFor='Deine Email:'
            name='email'
            id='email'
            required
          />
          <SigninBtn type='submit'>Passwort zurücksetzen</SigninBtn>
          <button type='button' className='reset' onClick={backToLoginTab}>
            zurück zum Login
          </button>
        </section>
      </Form>
    </>
  )
}

export default PasswordReset
