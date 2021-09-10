import React from 'react';
import { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

export default function Registration() {
  let [firstName, setFirstName] = useState('')
  let [lastName, setLastName] = useState('')
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [confirmPassword, setConfirmPassword] = useState('')


  let [firstNameError, setFirstNameError] = useState('не может быть пустым')
  let [lastNameError, setLastNameError] = useState('не может быть пустым')
  let [emailError, setEmailError] = useState("не может быть пустым")
  let [passwordError, setPasswordError] = useState("не может быть пустым")
  let [confirmPasswordError, setConfirmPasswordError] = useState('не может быть пустым')

  let [lastNameDirty, setLastNameDirty] = useState(false)
  let [firstNameDirty, setFirstNameDirty] = useState(false)
  let [emailDirty, setEmailDirty] = useState(false)
  let [passwordDirty, setPasswordDirty] = useState(false)
  let [confirmPasswordDirty, setConfirmPasswordDirty] = useState(false)

  let [formValid, setFormValid] = useState(false)
  let history = useHistory();

  useEffect(() => {
    if ((emailError || passwordError||lastNameError||firstNameError||confirmPasswordError)) {
      setFormValid(false)
    } else if((password===confirmPassword)) {
      setFormValid(true)
    } else {
      setFormValid(false)
    }
  }
  , [emailError,passwordError,lastNameError,firstNameError,confirmPasswordError,password,confirmPassword])


  const Handler = (e,set) => {
    set(e.target.value)
    if (set === setFirstName) {
      if (e.target.value.length < 3 || e.target.value.length > 8) {
        setFirstNameError(" не может быть меньше 3 и больше 8 символов")
        if (!e.target.value) {
          setFirstNameError("не может быть пустым")
        }
      } else {
        setFirstNameError('')
      }

    }
    if (set === setLastName) {
      if (e.target.value.length < 3 || e.target.value.length > 8) {
        setLastNameError(" не может быть меньше 3 и больше 8 символов")
        if (!e.target.value) {
          setLastNameError("не может быть пустым")
        }
      } else {
        setLastNameError('')
      }

    }
    if (set === setConfirmPassword) {
      if (e.target.value.length < 3 || e.target.value.length > 8) {
        setConfirmPasswordError(" не может быть меньше 3 и больше 8 символов")
        if (!e.target.value) {
          setConfirmPasswordError("не может быть пустым")
        }
      } else {
        setConfirmPasswordError('')
      }

    }
    
  }

  const emailHandler = (e) => {
    setEmail(e.target.value)
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('некоректная почта')
    }else{
      setEmailError('')
    };
  }
  const passwordHandler = (e) => {
    setPassword(e.target.value)
    if (e.target.value.length < 3 || e.target.value.length > 8) {
      setPasswordError("пароль не может быть меньше 3 и больше 8 символов")
      if (!e.target.value) {
        setPasswordError("не может быть пустым")
      }
    } else {
      setPasswordError('')
    }
  }

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break;
      case 'password':
        setPasswordDirty(true)
        e.target.setAttribute('type', 'password')
        
        break;
        case 'confirmPassword':
          setConfirmPasswordDirty(true)
          e.target.setAttribute('type', 'password')
          break;
        case 'firstName':
          setFirstNameDirty(true)
        break;
        case 'lastName':
          setLastNameDirty(true)
          break;
        default:
    }
  }

  const focus = (e) => {
    e.target.setAttribute('type','text')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const body = {
      user: `user`,
      data:{},
      registration: {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        password: e.target.password.value
      },
      sing:false,
    }

    let local=JSON.stringify(body)
    localStorage.setItem(`${body.user}`, local)
    history.push("/about");
    
  }

  return (
    <div>
      <h1>Register</h1>
      <form className="formRegister" onSubmit={handleSubmit}>
        <div >
          <div>
            <div className="registerPosition registerPosition1 refisterPositionGoriz ">
              <label htmlFor="firstName">First name</label>
              {(firstNameDirty && firstNameError) && <div className="messageError" style={{ color: "red" }}>{firstNameError}</div>}
              <input id="firstName" name="firstName" type="text" value={firstName} onChange={(e)=>Handler(e,setFirstName)} onBlur={e=>blurHandler(e)} />
            </div>
            <div className="registerPosition refisterPositionGoriz">
              <label htmlFor="lastName">Last name</label>
              {(lastNameDirty && lastNameError) && <div className="messageError" style={{ color: "red" }}>{lastNameError}</div>}
              <input value={lastName} name="lastName" onChange={(e)=>Handler(e,setLastName)} id="lastName" onBlur={e=>blurHandler(e)} type="text" />
            </div>
          </div>
          <div>
            <div className="registerPosition">
              <label htmlFor="Email">Email</label>
              {(emailDirty && emailError) && <div className="messageError" style={{ color: "red" }}>{emailError}</div>}
            <input value={email} onChange={(e=>emailHandler(e))} id="Email" name="email" onBlur={e=>blurHandler(e)} type="text"/>
          </div>
          </div>
          <div>
            <div className="registerPosition registerPosition1 refisterPositionGoriz">
              <label htmlFor="Password">Password</label>
              {(passwordDirty&&passwordError)&& <div style={{ color: "red" }}>{passwordError}</div>}
              <input id="Password"  onFocus={e=>focus(e)}  onChange={(e)=>passwordHandler(e)} value={password} onBlur={e=>blurHandler(e)} name="password" type="text" placeholder="password"/>
            </div>
            <div className="registerPosition refisterPositionGoriz">
              <label htmlFor="confirmPassword">Confirm Password</label>
              {(confirmPasswordDirty&&confirmPasswordError)&& <div style={{ color: "red" }}>{confirmPasswordError}</div>}
              <input  id="confirmPassword"   onFocus={e=>focus(e)}  onChange={(e)=>Handler(e,setConfirmPassword)} value={confirmPassword} onBlur={e=>blurHandler(e)} name="confirmPassword" type="text" placeholder=" confirm password"/>
            </div>
          </div>
          <button style={{ display: 'block' }} type="submit" disabled={!formValid}>Register </button>
        </div>
      </form>
    </div>
  )
}