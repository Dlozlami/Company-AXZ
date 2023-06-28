import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import {updateList,remove}  from '../features/employees/employeesSlice'


export default function Employees(){
    const [selectedImage, setSelectedImage] = useState(null);
    // eslint-disable-next-line
    const {userData} = useSelector((store)=>store.login);
    // eslint-disable-next-line
    const dispatch = useDispatch();

    const handleImageUpload = (event) => {
      
      const file = event.target.files[0];
      //let url = URL.createObjectURL(file);
      const photoReader = new FileReader();  
      console.log("1 State: "+photoReader.readyState);

      photoReader.onload = () => {
        photoReader.readAsDataURL(file);
        console.log("2 State: "+photoReader.readyState);
      }

      if (file) { 
        console.log("3 State: "+photoReader.readyState);
        setSelectedImage(photoReader.result);
      };
  
    };
    //eslint-disable-next-line

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
    const [employees, setEmployees] = useState([]);

    //GET DATA OUT OF JSON SERVER===============

    const getData = () => {
      axios.get("http://localhost:5000/employees/")
        .then(function (result) {
          setEmployees(result.data.employees);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    useEffect(() => {
        getData();
    },);
    
    //=========================================


    const handleChange = (event) => {
        const { id, value } = event.target;
        setInputValues((prevInputValues) => ({
          ...prevInputValues,
          [id]: value,
        }));
      }

    const add = () => {
        dispatch(updateList(inputValues));
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
        <div className="flexHorizontal w3-card-4 w3-round-large" style={{width:'95vw',height:'80vh',backgroundColor:'#f7f7f7'}}>
            <div className="sideArtPanelDisplay">
                <h1 style={{fontWeight:'900',paddingLeft:"0.5vw",backgroundColor:'black'}}>Show All Employees</h1>
                <h4 style={{paddingLeft:"0.5vw",backgroundColor:'black'}} >The team leading AXZ to the Future.</h4>
            </div>
            {isPopupOpen?
                <div className="popup" style={{width:'50vw',padding:'10px',overflow:'auto'}}>
                    <div style={{backgroundColor:'white',padding:'50px',justifyContent:'center',width:'50vw'}}>
                    <label htmlFor="name">Employee Number:</label>
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
                    <input type="text" id="birthday"  value={inputValues.birthday} placeholder="e.g. 20/12/1952" onChange={handleChange} />
                    <br />
                    <label htmlFor="position">Job title</label>
                    <input type="text" id="position"  value={inputValues.position} onChange={handleChange} />
                    <br />
                    <label htmlFor="phone">Phone</label>
                    <input type="text" id="phone"  value={inputValues.phone} onChange={handleChange} />
                    <br /><br />
                    <button onClick={add} style={{ marginRight: '5vw' }} className="limeButton w3-btn w3-border w3-border-black w3-round-large">
                        Update Employee
                    </button><br /><br /><br />
                    </div>
                </div>
                :
                <div id='employeeList' className="flexVertical" style={{width:'50vw',overflow:'auto',padding:'10px'}}>
                    {employees.map((employees) => (
                    <div key={employees.id} className='profile w3-panel w3-white w3-round-large' style={{padding:'10px',alignItems:'center'}}>
                        <div style={{width:'20vw'}}><img src={employees.pic} alt={employees.name} className='pic'></img></div>
                        <div style={{width:'63vw'}}>
                          <span style={{fontWeight:'700',marginRight:'2vw'}}>  {employees.name} {employees.surname}</span> <span style={{color:'gray'}}>{employees.position}</span><br/>
                          <span className='additionalInfo' style={{color:'gray',fontSize:'small'}}>Employees ID: {employees.id} &bull; D.O.B: {employees.birthday}</span> 
                          <p className='bio'>{employees.bio}</p>
                          <span className='additionalInfo'>&#x2709; {employees.email}</span> <span className='additionalInfo'> &bull; &#x260F; {employees.phone}</span> 
                        </div>
                        <div style={{width:'17vw',display:'flex',flexDirection:'column',alignItems:"end"}}>
                            <button className='w3-btn w3-white w3-border w3-border-red w3-round-large w3-text-red' onClick={() => dispatch(remove(employees.id))}>Remove</button><br/>
                            <button className='w3-btn w3-white w3-border w3-border-green w3-round-large w3-text-green'  onClick={() => update(employees)}>Update </button>
                        </div>
                    </div>
                    ))}
                </div>
            }
      </div>
    );
}