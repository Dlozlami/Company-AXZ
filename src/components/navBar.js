import { Outlet, Link } from "react-router-dom";

export default function Header({user,setUser}){
    return(
        <>
        <nav>
            <div style={{width:'50vw',fontSize:'2.5em',color:'white'}}><button id="logo"><Link to="/"  style={{textDecoration:'none'}}>AXZ</Link></button></div>
            <button className="w3-btn w3-border w3-border-black w3-card-4 w3-round-large" style={{color:'black'}}>
              <Link to="/"  style={{textDecoration:'none'}}>Home</Link>
            </button>
            <button className="w3-btn w3-border w3-border-black w3-card-4 w3-round-large" style={{color:'black'}}>
              <Link to="/login"  style={{textDecoration:'none'}}>Log In</Link>
            </button>
            <button className="w3-btn w3-border w3-border-black w3-card-4 w3-round-large" style={{color:'black'}}>
              <Link to="/register"  style={{textDecoration:'none'}}>{user?'Update Profile':'Register'}</Link>
            </button>
            <button className="w3-btn w3-border w3-border-black w3-card-4 w3-round-large" style={{color:'black'}}>
              <Link to="/employees"  style={{textDecoration:'none'}}>Employees</Link>
            </button>
        </nav>
  
        <Outlet />
      </>
    );
}