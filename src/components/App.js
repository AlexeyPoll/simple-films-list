import React from 'react';
import { Routes, Route } from "react-router-dom";

import Films from './Films/Films';
import Login from './Sso/Login';
import CreateAccount from './Sso/CreateAccount';
import Favorites from './Favorites/Fvorites';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Films />} />
      <Route path='/login' element={<Login />} />
      <Route path='/create-account' element={<CreateAccount />} />
      <Route path='/favorites' element={<Favorites />} />
    </Routes>
  );
}

export default App;
