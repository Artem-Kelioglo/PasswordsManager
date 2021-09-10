import React, { useContext, useEffect } from 'react';
import { Context } from '../../context';
export default function Home({ param }) {

  const { setSing } = useContext(Context)
  useEffect(() => {
    if (param) {
    let a = localStorage.getItem('user')
    let b = JSON.parse(a)
    b.sing = false;
    let q=JSON.stringify(b)
    localStorage.setItem('user', q)
    setSing(false)
  }
  })
  
  return (
    <div style={{ textAlign: 'center' }}>
      <img src="./picture/coded-lock.jpg" alt="" style={{ width: "60%"}}></img>
    </div>
  )
}