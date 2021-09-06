import { createContext, useContext, useState } from 'react'
import { useGlobalContext } from '../context/GlobalContext'
import { FaCheckCircle, FaPoop } from 'react-icons/fa'
import { useHistory, useLocation } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const AUTH_SIGNIN = '/auth/signin/'
  const [isTabLeft, setIsTabLeft] = useState(true)
  const [userCredential, setUserCredential] = useState({
    name: '',
    email: '',
    password: '',
  })
  const { API_USERS, setIsUserLoggedIn, setAlert, setLoading } =
    useGlobalContext()
  const [triggerPasswordReset, setTriggerPasswordReset] = useState(false)
  const forwardPage = useHistory()
  const { state } = useLocation()

  // POST registriere neuen User im Backend / logge User ein (Backend)
  const signInUser = async (url, tryLogin) => {
    try {
      setLoading(true)
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(userCredential),
      })
      if (res.ok) {
        const userData = await res.json()
        setLoading(false)
        if (tryLogin) {
          sessionStorage.setItem('id', userData.user._id)
          sessionStorage.setItem('name', userData.user.name)
          sessionStorage.setItem('token', userData.token)
          forwardPage.push(state ? state.from : '/', setIsUserLoggedIn(true))
        } else {
          setAlert({
            display: true,
            icon: <FaCheckCircle />,
            msg: 'Du bist registriert! Logge dich nun ein!',
          })
          setUserCredential({ name: '', email: '', password: '' })
          setIsTabLeft(true)
        }
      } else {
        throw new Error('Username oder Passwort stimmen nicht')
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
      setAlert({
        display: true,
        icon: <FaPoop />,
        msg: 'Username oder Passwort stimmen nicht',
      })
      setUserCredential({ name: '', email: '', password: '' })
    }
  }

  // const resetPassword = async (url) => {
  //   try {
  //     setLoading(true);
  //     const res = await fetch(url, {
  //       method: 'POST'
  //     })
  //     if(res.ok) {

  //     }
  //   } catch (error) {

  //   }
  // }

  // öffne Passwortreset
  const openPasswordResetTab = () => {
    setTriggerPasswordReset(true)
  }

  const backToLoginTab = () => {
    setTriggerPasswordReset(false)
  }

  // verarbeite die Eingabe des Users
  const checkSigninInput = (e) => {
    setUserCredential({
      ...userCredential,
      [e.target.name]: e.target.value,
    })
  }

  // logge den User ein (UI)
  const loginNow = (e) => {
    e.preventDefault()
    signInUser(AUTH_SIGNIN, isTabLeft)
  }

  // registriere den User
  const signupNow = (e) => {
    e.preventDefault()
    signInUser(API_USERS)
  }

  // speichere states und functions in Variable
  const authValues = {
    AUTH_SIGNIN,
    isTabLeft,
    setIsTabLeft,
    userCredential,
    setUserCredential,
    checkSigninInput,
    loginNow,
    signupNow,
    triggerPasswordReset,
    openPasswordResetTab,
    backToLoginTab,
  }

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
