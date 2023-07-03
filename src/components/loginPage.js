import { useDispatch, useSelector } from 'react-redux';
import {setLogin,clearState,setUserData,setIsLoggedIn} from '../features/login/loginSlice';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';

export default function LoginPage()
{

    const {userData,validPwd,validUsername,isLoggedIn} = useSelector((store)=>store.login);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const grabInputs = ()=>
    {
        return([document.getElementById("id").value,document.getElementById("password").value]);
    }
    
    const printWelcome =()=>
    (   <div style={{width:'95vw',height:'85vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            <div className=" w3-card-4 w3-round-large w3-white" style={{padding:'20px',width:'30vw'}}>
            <h1 style={{fontWeight:'500',color:'darkGray'}}>Welcome, {userData.name}!</h1>
                <button className="limeButton w3-btn w3-border w3-border-black w3-round-large" onClick={() => dispatch(clearState())}>log out</button>
            </div>
        </div>);

    const printForm =()=>
        (
        <div style={{width:'95vw',height:'85vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            <div className=" w3-card-4 w3-round-large w3-white" style={{padding:'20px',width:'30vw'}}>
                <h1 style={{fontWeight:'500',color:'darkGray'}}>Log in</h1>
                <div>
                    <label htmlFor="id" >Username</label><br />
                    <input type="text" id="id" className="w3-round"/> 
                    <br />{validUsername===2?<span className="w3-red">Invalid username</span>:<br />}

                    <label htmlFor="id">Password</label><br />
                    <input type="password" id="password"  className="w3-round"/>
                    <br />{validPwd===2?<span className="w3-red">Invalid password</span>:<br />}<br />
                    <br /><button className="limeButton w3-btn w3-border w3-border-black w3-round-large" onClick={(e) => dispatch(setLogin(grabInputs()))} style={{marginRight:"2vw"}}>Log in</button> <button className="limeButton w3-btn w3-border w3-border-black w3-round-large" onClick={() => navigate('/Register')}>Register</button>
                </div>
            </div>
        </div>);
    
    useEffect(() => {
        const token = localStorage.getItem('axzjwtUser');
        if (token) {
          // If token is present, dispatch setUserData action with the decoded token
          const decodedToken = jwt_decode(token);
          dispatch(setUserData(decodedToken));
          dispatch(setIsLoggedIn(true));
        }
      }, [dispatch]);

    return(<>{isLoggedIn? printWelcome() : printForm()}
</>);
}