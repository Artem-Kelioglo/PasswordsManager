import React,{ useState } from 'react';
import Header from "./header/Header"
import Main from "./components/main/Main"
import { Context } from "./context"

import "./App.css"

function App() {
  let [sing, setSing] = useState(false)

  return (
    <Context.Provider value={{ sing, setSing }}>
      <div>
        <Header />
        <Main/>
      </div>
      </Context.Provider>
  );
}

export default App;
