import React, { useEffect, useState } from 'react';
import axios from "axios";

//This component will known as State 2

export default function DisplayEmployees({whosOnDisplay,setWhosOnDisplay}){

    const [employees, setEmployees] = useState([]);
    const [isPopupOpen, setPopupOpen] = useState(false);

    const changeDisplay = ()=>{
        setWhosOnDisplay(1);
        console.log(whosOnDisplay);
    };

    //GET DATA OUT OF JSON SERVER===============
    const getData = () => {
      let requestOptions = {
        method: "GET",
        redirect: "follow"
      };
    
      fetch("http://localhost:4000/Employees", requestOptions)
        .then((response) => response.json())
        .then((result) => setEmployees(result))
        .catch((error) => console.log("error", error));
    };
    
    useEffect(() => {
      getData();
    }, []);
    
    //=========================================

    //REMOVE AN EMPLOYEE FROM THE JSON SERVER
    const remove = (emp_num)=>{
        axios.delete("http://localhost:4000/Employees/"+emp_num)
        .then(response => {
        console.log(response.data);
        })
        .catch(error => {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
        });
    }

    //=========================================

    let updateClientId;

    const add = () => {
        const updatedInputValues = {
          name: document.getElementById("name").value,
          surname: document.getElementById("surname").value,
          email: document.getElementById("email").value,
          bio: document.getElementById("bio").value,
          pic: document.getElementById("pic").value,
          birthday: document.getElementById("birthday").value,
          position: document.getElementById("position").value,
          phone: document.getElementById("phone").value,
        };

        axios.patch("http://localhost:4000/Employees/"+updateClientId, updatedInputValues)
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
        setPopupOpen(false);
      };
    

    const update = (emp_num)=>{
        updateClientId=emp_num;
            console.log(emp_num);
        setPopupOpen(true);
    }

    if(isPopupOpen)
    {
        return (
            <div>
                
                {
                    <h4>
                        <span style={{color:'gray'}}>Employees ID: {employees.id}</span> 
                    </h4>
                }
              {isPopupOpen && (
                <div className="popup">
                  <div className="formStyles">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" />
                    <br />
                    <label htmlFor="surname">Surname</label>
                    <input type="text" id="surname" />
                    <br />
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" />
                    <br />
                    <label htmlFor="bio">Bio</label>
                    <input type="text" id="bio" />
                    <br />
                    <label htmlFor="pic">Upload photo</label>
                    <input type="url" id="pic" />
                    <br />
                    <label htmlFor="birthday">Date of birth</label>
                    <input type="date" id="birthday" />
                    <br />
                    <label htmlFor="position">Job title</label>
                    <input type="text" id="position" />
                    <br />
                    <label htmlFor="phone">Phone</label>
                    <input type="text" id="phone" />
                    <br /><br />
                    <button onClick={add} style={{ marginRight: '5vw' }} className="limeButton w3-btn w3-border w3-border-black w3-round-large">
                      Add Employee
                    </button>
                  </div>
                </div>
              )}
            </div>
          ); 
    }

    return (
        <div className="flexHorizontal w3-card-4 w3-round-large" style={{width:'95vw',height:'80vh'}}>
            <div className="sideArtPanelDisplay">
                <h2>Show all employees</h2>
                <h4>The team leading AXZ to the Future.</h4>
                <br />
                <button onClick={changeDisplay} className="limeButton w3-btn w3-border w3-border-black w3-card-4 w3-round-large" style={{width:'20vw',marginTop:'50vh'}}>Add a new Employee</button>                
            </div>
            {isPopupOpen?
                <div className="flexVertical" style={{width:'50vw',overflow:'scroll',padding:'10px'}}>
                    {employees.map((employees) => (
                    <div key={employees.id} className='profile w3-panel w3-white w3-round-large' style={{padding:'10px',alignItems:'center'}}>
                        <div><img src={employees.pic} alt={employees.name} className='pic'></img></div>
                        <div style={{marginRight:'2vw'}}>
                            <h2>
                                {employees.name} {employees.surname} | {employees.position}
                            </h2>
                            <h4>
                                <span style={{color:'gray'}}>Employees ID: {employees.id}</span> 
                            </h4>
                            <p className='bio'>{employees.bio}</p>
                            <span>&#x2709; {employees.email}</span> <span> &bull; &#x260F; {employees.phone}</span> 
                        </div>
                        <div>
                            <button className='w3-btn w3-white w3-border w3-border-red w3-round-large w3-text-red' onClick={() => remove(employees.id)}>Remove</button><br/><br/>
                            <button className='w3-btn w3-white w3-border w3-border-green w3-round-large w3-text-green'  onClick={() => update(employees.id)}>Update</button>
                        </div>
                    </div>
                    ))}
                </div>:
                <div className="popup" style={{width:'50vw',overflow:'scroll',padding:'10px'}}>
                <div className="formStyles">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" />
                  <br />
                  <label htmlFor="surname">Surname</label>
                  <input type="text" id="surname" />
                  <br />
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" />
                  <br />
                  <label htmlFor="bio">Bio</label>
                  <input type="text" id="bio" />
                  <br />
                  <label htmlFor="pic">Upload photo</label>
                  <input type="url" id="pic" />
                  <br />
                  <label htmlFor="birthday">Date of birth</label>
                  <input type="date" id="birthday" />
                  <br />
                  <label htmlFor="position">Job title</label>
                  <input type="text" id="position" />
                  <br />
                  <label htmlFor="phone">Phone</label>
                  <input type="text" id="phone" />
                  <br /><br />
                  <button onClick={add} style={{ marginRight: '5vw' }} className="limeButton w3-btn w3-border w3-border-black w3-round-large">
                    Add Employee
                  </button>
                </div>
              </div>
            }
      </div>
    );
}