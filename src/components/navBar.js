import { Outlet, Link } from "react-router-dom";

export default function Header({user,setUser}){
    return(
        <>
        <nav>
            <div style={{width:'50vw',fontSize:'2.5em',color:'white'}}><button id="logo">AXZ</button></div>
            <button className="w3-btn w3-border w3-border-black w3-card-4 w3-round-large" style={{color:'black'}}>
              <Link to="/">Home</Link>
            </button>
            <button className="w3-btn w3-border w3-border-black w3-card-4 w3-round-large" style={{color:'black'}}>
              <Link to="/login">Log In</Link>
            </button>
            <button className="w3-btn w3-border w3-border-black w3-card-4 w3-round-large" style={{color:'black'}}>
              <Link to="/register">{user?'Update Profile':'Register'}</Link>
            </button>
            <button className="w3-btn w3-border w3-border-black w3-card-4 w3-round-large" style={{color:'black'}}>
              <Link to="/employees">Employees</Link>
            </button>
        </nav>
  
        <Outlet />
      </>
    );
}