import React,{useState,useEffect} from 'react';

function Tbody({ number }) {
  return (
    <tbody>
      {number.map((item,index)=><Tr key={index} inner={item}> </Tr>)} 
    </tbody>
  )
}

function Tr({ inner }) {
  return (
    <tr>
      <Td inn={inner} />
    </tr>
  )
}

function Td({ inn }) {
  let [exists, setExists] = useState(true);
  let [Password, setPassword] = useState(inn.password);
  let [prev, setPrev] = useState(Password)
  let [visible, setVisible] = useState(true)

  const handlerClickSymbol = () => {
    setVisible(!visible)
  }

  const handlerClickPassword=()=>{
    let test = prompt("Изменить пароль на :", '');
    let user=localStorage.getItem('user')
    let userData = JSON.parse(user)
    userData.data[inn.name].password = test
    setVisible(false)
    setPassword(test)
    setPrev(test)
    let local=JSON.stringify(userData)
    localStorage.setItem(`user`, local)
  }
  useEffect(() => {
    if (visible) {
      let symbol = prev.replace(/[\s\S]/g, "*")
      setPrev(symbol)
    } 
  }, [Password, exists, visible,prev])
  
  const handlerClickClear = () => {
    let user=localStorage.getItem('user')
    let userData = JSON.parse(user)
    delete userData.data[inn.name]
    let local=JSON.stringify(userData)
    localStorage.setItem(`user`, local)
    setExists(false)
  }

  return (
    <>
      {exists ? (
        <>
          <td>{inn.name}</td>
          <td >{inn.email}</td>
          <td >{inn.urlName}</td>
          <td  onClick={()=>handlerClickSymbol()} >{visible?prev:Password}</td>
          <td  >
            <button onClick={() => handlerClickPassword()}   style={{backgroundColor:"green", borderRadius:"50%"}}>edit</button>
            <button  onClick={() => handlerClickClear()} style={{backgroundColor:"red", borderRadius:"50%"}}>x</button>
          </td>
        </> 
      ):<td className="final"/>}
    </>
  )
}

export default function Table() {
  let visible='No data available at this time, please add it'
  let user=localStorage.getItem('user')
  let userData = JSON.parse(user)
  let data = userData.data
  let arr = []
  for (let key in data) {
   arr.push(data[key])
  }
  
  return (
    <div className="table">
      <table >
        <thead>
          <tr>
            <th>Name</th>
            <th>Login</th>
            <th>Web address</th>
            <th>Password</th>
            <th>Edit</th>
          </tr>
        </thead>
        <Tbody number={arr}/>
      </table>
      {Object.keys(data).length === 0?<div>{visible}</div>:<div></div>}
    </div>
  )
}