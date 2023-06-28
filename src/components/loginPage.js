import { useDispatch, useSelector } from 'react-redux';
import {validateUser,clearState} from '../features/login/loginSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginPage()
{
    // eslint-disable-next-line
    const {userData,validPwd,validUsername,isLoggedIn} = useSelector((store)=>store.login);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const grabInputs = ()=>
    {
        return([document.getElementById("id").value,document.getElementById("password").value]);
    }
    
    const printWelcome =()=>
    (   <div style={{width:'90vw',height:'80vh'}}>
            <div className=" w3-card-4 w3-round-large w3-white w3-display-middle" style={{padding:'20px',width:'30vw'}}>
            <h1 style={{fontWeight:'500',color:'#d2ff58'}}>Welcome, {userData.name}!</h1>
                <button className="limeButton w3-btn w3-border w3-border-black w3-round-large" onClick={() => dispatch(clearState())}>log out</button>
            </div>
        </div>);

    const printForm =()=>
        (
        <div style={{width:'90vw',height:'80vh'}}>
            <div className=" w3-card-4 w3-round-large w3-white w3-display-middle" style={{padding:'20px',width:'30vw'}}>
                <h1 style={{fontWeight:'500',color:'#d2ff58'}}>Log in</h1>
                <div>
                    <label htmlFor="id" >Username</label><br />
                    <input type="text" id="id" className="w3-round"/> {validUsername?'':<span className="w3-red">Invalid username</span>}
                    <br /><br />
                    <label htmlFor="id">Password</label><br />
                    <input type="password" id="password"  className="w3-round"/>{validPwd?'':<span className="w3-red">Invalid username</span>}
                    <br /><br />
                    <button className="limeButton w3-btn w3-border w3-border-black w3-round-large" onClick={(e) => dispatch(validateUser(grabInputs()))} style={{marginRight:"2vw"}}>Log in</button> <button className="limeButton w3-btn w3-border w3-border-black w3-round-large" onClick={() => navigate('/Register')}>Register</button>
                </div>
            </div>
        </div>)
    return(<>{isLoggedIn? printWelcome() : printForm()}
</>);
}