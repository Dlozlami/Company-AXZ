import './App.css';
import Navbar from './components/navBar';
import Home from './components/home';
import Login from './components/loginPage';
import Employees from './components/employees';
import NoPage from './components/noPage';
import Register from './components/register';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';
import {setUserData,setIsLoggedIn} from './features/login/loginSlice';

export default function App() {
  const {isLoggedIn} = useSelector((store)=>store.login);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('axzjwtUser');
    if (token) {
      // If token is present, dispatch setUserData action with the decoded token
      const decodedToken = jwt_decode(token);
      dispatch(setUserData(decodedToken));
      dispatch(setIsLoggedIn(true));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="Login" element={<Login />}/>
          <Route path="Register" element={<Register />} />
          <Route path="Employees" element={
            isLoggedIn?
            <Employees  />
            :
            <Navigate to="/Login"/>
          } />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </div>
  );
}
