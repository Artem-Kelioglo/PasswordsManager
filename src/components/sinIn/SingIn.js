import React from 'react';
import { useState, useEffect ,useContext} from 'react';
import PanelPassword from '../panelPassword/PanelPassword'
import {Context} from "../../context"

export default function SingIn() {
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')

  let [emailDirty, setEmailDirty] = useState(false)
  let [passwordDirty, setPasswordDirty] = useState(false)

  let [emailError, setEmailError] = useState("не может быть пустым")
  let [passwordError, setPasswordError] = useState("не может быть пустым")
  let [formValid, setFormValid] = useState(false)
  
  let [valitate, setValitate] = useState(false)
   
  let {setSing } = useContext(Context)
  
  let [erroracaunt,setErroracaunt] = useState('')
  

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }
  , [emailError,passwordError])

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
        default:
    }
  }

  const focus = (e) => {
    e.target.setAttribute('type','text')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const body = {
      email: e.target.email.value,
      password: e.target.password.value
    }

    let local = localStorage["user"]
    
    if (local) {
      local = JSON.parse(local)
      if (body.password === local.registration.password) {
        setValitate(true)
        console.log(local)
        local.sing = true
        let l= JSON.stringify(local)
        localStorage.setItem(`user`, l)
        setSing(true)
      } else {
        setErroracaunt("неверный пороль")
      }
    } else {
      setErroracaunt("неверные данные")
    }
    
  }

  return (
    <div className="loginTitle">
      {
        valitate === false ?
        (<form className="singForm" onSubmit={handleSubmit}>
        <h1>Sing In</h1>
        <div>
        <label htmlFor="login">Login</label>
        {(emailDirty && emailError) && <div className="messageError" style={{ color: "red" }}>{emailError}</div>}
        <input id="login" onChange={(e)=>emailHandler(e)} value={email} onBlur={e=>blurHandler(e)}  name="email" type="text" placeholder="email" />
        </div>
        <div>
        <label htmlFor="password">Password</label>
        {(passwordDirty&&passwordDirty)&& <div style={{ color: "red" }}>{passwordError}</div>}
        <input id="password" onFocus={e=>focus(e)}  onChange={(e)=>passwordHandler(e)} value={password} onBlur={e=>blurHandler(e)} name="password" type="text" placeholder="password" minLength="3" maxLength="8"/> 
            </div>

          <button type="submit" disabled={!formValid}> Registaration</button>
          <div>{erroracaunt}</div>
          </form>)
        : (<PanelPassword/>)
      }
    </div>
  );
}