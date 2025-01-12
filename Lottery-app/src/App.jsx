import React from "react";
import Home from "./Home";
import Pickwinner from "./Pickwinner";
import {BrowserRouter, Link,Route,Routes} from 'react-router-dom'

function App() {

  return <>
  <BrowserRouter>
  <div>
    <nav>
      <ul>
        <li> <Link to="/" > HOME </Link></li>
        <li><Link to="/pick-winner">PICK WINNER</Link></li>
      </ul>
    </nav>
    <Routes>
      <Route path="/" element={<Home/> } ></Route>
      <Route path="/pick-winner" element={<Pickwinner/>} ></Route>
    </Routes>
  </div>
  </BrowserRouter>
  </>
}

export default App;