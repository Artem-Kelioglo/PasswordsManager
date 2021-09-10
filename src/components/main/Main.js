import React,{useContext} from 'react';
import Home from './Home'
import Registration from '../registration/Registration'
import './Main.css'
import PanelPassword from '../panelPassword/PanelPassword'
import { Context } from '../../context';
import Modal from '../panelPassword/Modal'
import {
  Switch,
  Route,
} from "react-router-dom";
import SingIn from '../../components/sinIn/SingIn';

export default function Main() {
  const { sing} = useContext(Context)
 
  return (
    <div className="main-block">
      <Switch>
      <Route exact path="/" >
         <Home/>
        </Route>
        <Route exact path="/about">
          {!sing ?<SingIn/>:<PanelPassword/>}
        </Route>
        <Route exact path="/register">
          <Registration/>
        </Route>
        <Route exact path="/create">
          <Modal/>
        </Route>
        <Route exact path="/page">
          <Home/>
        </Route>
        <Route exact path="/panel">
          <PanelPassword/>
        </Route>
        <Route exact path="/logout">
          <Home param={ true}/>
        </Route>
      </Switch>
    </div>
  )
}