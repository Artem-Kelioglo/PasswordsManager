import React from 'react';
import HeaderLogo from './HeaderLogo'
import "./Header.css"
import Navbar from './navbar/Navbar'

export default function Header() {
  return (
    <header  className="header">
      <HeaderLogo />
      <Navbar/>
     </header>
   )
 }