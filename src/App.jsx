import React, { useEffect, useState } from 'react';
import Header from './Header';
import Menu from './Menu';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
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
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
          })
        )
      } else {
        dispatch(logout())
      }
    })
  }, [dispatch])
 

  return (
    <Router>
    <div className='app'>
      <Switch>
        <Route exact path='/'>
          <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          {isMenuOpen && <Menu />}
          <HeaderBlocked />
        </Route>
        <Route exact path='/login'>
          {user ? <Redirect to='/teslaaccount' /> : <Login />}
        </Route>
        <Route exact path='/signup'>
          <SignUp />
        </Route>
        <Route exact path='/teslaaccount'>
          {!user ? (
            <Redirect to='/login' />
          ) : (
            <>
              <TeslaAccount
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
              />
              {isMenuOpen && <Menu />}
            </>
          )}
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
