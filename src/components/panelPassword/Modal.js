import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";


export default function Modal() {
  let [name, setName] = useState('')
  let [url, setUrl] = useState('')
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')


  let [nameError, setNameError] = useState('не может быть пустым')
  let [urlError, setUrlError] = useState('не может быть пустым')
  let [emailError, setEmailError] = useState("не может быть пустым")
  let [passwordError, setPasswordError] = useState("не может быть пустым")

  let [nameDirty, setNameDirty] = useState(false)
  let [urlDirty, setUrlDirty] = useState(false)
  let [emailDirty, setEmailDirty] = useState(false)
  let [passwordDirty, setPasswordDirty] = useState(false)
  let history = useHistory();
  let [formValid, setFormValid] = useState(false)

  useEffect(() => {
    if ((emailError || passwordError||urlError||nameError)) {
      setFormValid(false)
    } else  {
      setFormValid(true)
    }
  }
    
  , [emailError,passwordError,urlError,nameError,])

  const nameHandler = (e) => {
    setName(e.target.value)
    if (e.target.value.length < 3 || e.target.value.length > 8) {
      setNameError("не меньше 3 и больше 8 символов")
      if (!e.target.value) {
        setNameError("не может быть пустым")
      }
    } else {
      setNameError('')
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

  const urlHandler = (e) => {
    setUrl(e.target.value)
    const re = new RegExp("^(http|https)://", "i");
    if (!re.test(String(e.target.value).toLowerCase())) {
      setUrlError('неверный адресс')
    }else{
      setUrlError('')
    };
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value)
    if (e.target.value.length < 5 || e.target.value.length > 15) {
      setPasswordError("пароль не может быть меньше 5 и больше 15 символов")
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
        case 'name':
          setNameDirty(true)
        break;
        case 'url':
          setUrlDirty(true)
          break;
        default:
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // e.stopPropagation();
    let data = localStorage.getItem('user')
    let userData = JSON.parse(data)
    let name=e.target.name.value
    const body = {
      name: e.target.name.value,
      urlName: e.target.url.value,
      email: e.target.email.value,
      password: e.target.password.value  
    }
    userData.data[name]=body
      
    let local=JSON.stringify(userData)
    localStorage.setItem(`user`, local)
    history.push("/panel");
  }

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <div className="modal-header">
          <span className="modal-name">Create New Password</span>
          <button type="button" style={{padding:'0'}}><Link to="/" style={{padding:'10px'}}>x</Link></button>
        </div>
        <div className="modal-body">
          <div className="modal-input-block modal-input-block--1">
            <div >
            <input value={name} onChange={(e) => nameHandler(e)} onBlur={ (e)=>blurHandler(e)} type="text" placeholder="Name" name="name"/>
            {(nameDirty && nameError) && <div className="messageError" style={{ color: "red" }}>{nameError}</div>}
            </div>
            <div>
              <input name="url" value={url} onChange={(e) => urlHandler(e)} onBlur={e=>blurHandler(e)} type="text" placeholder="https://" />
              {(urlDirty && urlError) && <div className="messageError" style={{ color: "red" }}>{urlError}</div>}
            </div>
        </div>
        <div  className="modal-input-block">
            <input type="email" placeholder="Email" name="email" value={email} onChange={(e=>emailHandler(e))} onBlur={e=>blurHandler(e)}/>
            {(emailDirty && emailError) && <div className="messageError" style={{ color: "red" }}>{emailError}</div>}
        </div>
        <div className="modal-input-block">
            <input type="password" value={password} placeholder="Password" name="password" onChange={(e) => passwordHandler(e)} onBlur={ (e)=>blurHandler(e)}/>
            {(passwordDirty&&passwordError)&& <div style={{ color: "red" }}>{passwordError}</div>}
        </div>
        </div>
        <div className="button-create">
            <button disabled={!formValid} type="submit" style={{ padding: "0px 5px", fontSize: "30px" }}  >+</button>
        </div>      
      </form>
     </div>
   )
 }