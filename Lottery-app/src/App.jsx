import React from "react";
import Home from "./Home";
import Pickwinner from "./Pickwinner";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="bg-indigo-700 p-4 shadow-lg">
          <ul className="flex justify-center space-x-8 text-white font-semibold">
            <li>
              <Link to="/" className="hover:text-gray-300">
                HOME
              </Link>
            </li>
            <li>
              <Link to="/pick-winner" className="hover:text-gray-300">
                PICK WINNER
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pick-winner" element={<Pickwinner />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
