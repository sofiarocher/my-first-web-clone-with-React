import React, { useEffect, useState } from 'react';
import Header from './Header';
import Menu from './Menu';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HeaderBlocked from './HeaderBlocked';
import Login from './Login';
import { useDispatch, useSelector } from 'react-redux';
import {login, logout, selectUser} from "./features/userSlice"
import SignUp from "./SignUp"
import TeslaAccount from "./TeslaAccount"
import { auth } from './Firebase';

function App() {
  const user = useSelector(selectUser)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(login({
          email: userAuth.user.email,
          uid: userAuth.user.uid,
          displayNamer: userAuth.displayName,
        }))
      } else {
        dispatch(logout())
      }
    })
  }, [dispatch])
 

  return (
    <Router>
      <div className='app'>
        <React.Fragment> {/* its used for that element that stays on every page */}
                <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
                {isMenuOpen && <Menu />}
          <Routes>
            <Route path="/" exact element={<HeaderBlocked />} />
            <Route exact path="/login" element={<Login/>}/>
              {/* {{user ? Navigate ('/teslaaccount') : <Login/> }} */}
            <Route exact path="/signup" element={<SignUp/>}/>
            {/* {{!user ? Navigate ('/login') : {<TeslaAccount isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />} {isMenuOpen && <Menu />}} */}
            <Route exact path="/teslaaccount" element={<TeslaAccount/>}/>
          </Routes>
        </React.Fragment>
      </div>
    </Router>
  );
}

export default App;
