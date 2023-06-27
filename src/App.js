import './App.css';
import Navbar from './components/navBar';
import Home from './components/home';
import Login from './components/loginPage';
import Employees from './components/displayEmployees';
import NoPage from './components/noPage';
import Register from './components/addEmployee';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function App() {
  const {userData} = useSelector((store)=>store.login);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="Login" element={<Login />}/>
          <Route path="Register" element={<Register />} />
          <Route path="Employees" element={
            userData&&userData.password?
            <Employees  />
            :
            <Navigate to="/"/>
          } />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </div>
  );
}
