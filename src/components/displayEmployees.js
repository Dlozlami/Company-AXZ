import React, { useEffect, useState } from 'react';
import axios from "axios";

//This component will known as State 2

export default function DisplayEmployees({whosOnDisplay,setWhosOnDisplay}){
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }
    };

    const [employees, setEmployees] = useState([]);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [inputValues, setInputValues] = useState({
        id:"",
        name: "",
        surname: "",
        email: "",
        bio: "",
        pic: "",
        birthday: "",
        position: "",
        phone: "",
      });

    const [employeeListReload, setEmployeeListReload] = useState(false);

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
    }, [employeeListReload]);
    
    //=========================================

    //REMOVE AN EMPLOYEE FROM THE JSON SERVER
    const remove = (emp_num)=>{
        axios.delete("http://localhost:4000/Employees/"+emp_num)
        .then(response => {
        console.log(response.data);
        setEmployeeListReload(!employeeListReload);
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
    const handleChange = (event) => {
        const { id, value } = event.target;
        setInputValues((prevInputValues) => ({
          ...prevInputValues,
          [id]: value,
        }));
      }

    const add = () => {
        axios.patch("http://localhost:4000/Employees/"+inputValues.id, inputValues)
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
        setEmployeeListReload(!employeeListReload);
        setPopupOpen(false);
      };
    

    const update = (employee)=>{
        setPopupOpen(true);
        setInputValues({
            id:employee.id,
            name: employee.name,
            surname: employee.surname,
            email: employee.email,
            bio: employee.bio,
            pic: selectedImage,
            birthday: employee.birthday,
            position: employee.position,
            phone: employee.phone,
          });
    }

    return (
        <div className="flexHorizontal w3-card-4 w3-round-large" style={{width:'95vw',height:'80vh'}}>
            <div className="sideArtPanelDisplay">
                <h1 style={{fontWeight:'900'}}>Show All Employees</h1>
                <h4>The team leading AXZ to the Future.</h4>
                <br />
                <button onClick={changeDisplay} className="limeButton w3-btn w3-border w3-border-black w3-card-4 w3-round-large" style={{width:'20vw',marginTop:'30vh'}}>Add a new Employee</button>                
            </div>
            {isPopupOpen?
                <div className="popup" style={{width:'50vw',padding:'10px'}}>
                    <div style={{backgroundColor:'white',padding:'50px',justifyContent:'center',width:'50vw'}}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="id"  value={inputValues.id} readOnly/>
                    <br />
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name"  value={inputValues.name} onChange={handleChange} />
                    <br />
                    <label htmlFor="surname">Surname</label>
                    <input type="text" id="surname"  value={inputValues.surname} onChange={handleChange} />
                    <br />
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email"  value={inputValues.email} onChange={handleChange} />
                    <br />
                    <label htmlFor="bio">Bio</label>
                    <input type="text" id="bio"  value={inputValues.bio} onChange={handleChange} />
                    <br />
                    <label htmlFor="pic">Upload photo</label>
                    <input type="file" accept="image/*" id="pic" onChange={handleImageUpload} />
                    <br />
                    <label htmlFor="birthday">Date of birth</label>
                    <input type="date" id="birthday"  value={inputValues.birthday} onChange={handleChange} />
                    <br />
                    <label htmlFor="position">Job title</label>
                    <input type="text" id="position"  value={inputValues.position} onChange={handleChange} />
                    <br />
                    <label htmlFor="phone">Phone</label>
                    <input type="text" id="phone"  value={inputValues.phone} onChange={handleChange} />
                    <br /><br />
                    <button onClick={add} style={{ marginRight: '5vw' }} className="limeButton w3-btn w3-border w3-border-black w3-round-large">
                        Add Employee
                    </button>
                    </div>
                </div>
                :
                <div id='employeeList' className="flexVertical" style={{width:'50vw',overflow:'auto',padding:'10px'}}>
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
                            <button className='w3-btn w3-white w3-border w3-border-green w3-round-large w3-text-green'  onClick={() => update(employees)}>Update</button>
                        </div>
                    </div>
                    ))}
                </div>
            }
      </div>
    );
}