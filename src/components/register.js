import React, { useState } from "react";
import { addUser } from '../features/register/registerSlice';
import { useDispatch, useSelector } from 'react-redux';



export default function Register() {
  const {userAdded} = useSelector((store)=>store.register);
  const dispatch = useDispatch();
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

  const generateRandomString = () => {
    const characters = '0123456789';
    let randomString = 'AXZ';
  
    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
    }
    
    return randomString;
  };

  //eslint-disable-next-line
  const [inputValues, setInputValues] = useState({
    id:"",
    password: "",
    name: "",
    surname: "",
    email: "",
    bio: "",
    pic: "",
    birthday: "",
    position: "",
    phone: "",
  });

  const add = () => {
    const updatedInputValues = {
      id:generateRandomString(),
      password: document.getElementById("pwd").value,
      name: document.getElementById("name").value,
      surname: document.getElementById("surname").value,
      email: document.getElementById("email").value,
      bio: document.getElementById("bio").value,
      pic: selectedImage,
      birthday: document.getElementById("birthday").value,
      position: document.getElementById("position").value,
      phone: document.getElementById("phone").value,
    };

    setInputValues(updatedInputValues);
    
    dispatch(addUser(updatedInputValues));
  };

 if(userAdded){
    document.getElementById("addEmployeeBTN").disabled = true;
    document.getElementById("pwd").value='';
    document.getElementById("name").value='';
    document.getElementById("surname").value='';
    document.getElementById("email").value='';
    document.getElementById("bio").value='';
    document.getElementById("pic").value='';
    document.getElementById("birthday").value='';
    document.getElementById("position").value='';
    document.getElementById("phone").value='';
    document.getElementById("addEmployeeBTN").disabled = false;
  }

  const checkEmail = (event)=>{
    let email = (event.target.value).split(' ')[0];
    // eslint-disable-next-line
    var newRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    email.match(newRegex)?document.getElementById("invalidEmail").style.display="none":document.getElementById("invalidEmail").style.display="inline";
  }

  return (
    <div className="flexHorizontal w3-card-4 w3- -large" style={{width:'95vw',height:'80vh',marginBottom:'5vh'}}>
      <div className="sideArtPanelAdd">
        <h1 style={{fontWeight:'900',paddingLeft:"0.5vw",backgroundColor:'black'}}>Welcome to AXZ</h1>
        <h4 style={{paddingLeft:"0.5vw",backgroundColor:'black'}}>Add a new employee</h4>
      </div>
      <div className="formStyles" style={{overflow:'auto'}}>
      <label htmlFor="name">Name</label>
        <input type="text" id="name" />
        <br /><br />
        <label htmlFor="surname">Surname</label>
        <input type="text" id="surname" />
        <br /><br />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" onChange={(e) => checkEmail(e)}/>
        <br /><span className="w3-text-red" id="invalidEmail" style={{display:'none'}}>* This is not a valid email address.</span><br />
        <label htmlFor="bio">Password</label>
        <input type="password" id="pwd" />
        <br /><br />
        <label htmlFor="bio">Bio</label>
        <input type="text" id="bio" />
        <br /><br />
        <label htmlFor="pic">Upload photo</label>
        <input type="file" accept="image/*" id="pic" onChange={handleImageUpload} />
        <br /><br />
        <label htmlFor="birthday">Date of birth</label>
        <input type="date" id="birthday" placeholder="e.g. 20/12/1952" />
        <br /><br />
        <label htmlFor="position">Job title</label>
        <input type="text" id="position" />
        <br /><br />
        <label htmlFor="phone">Phone</label>
        <input type="text" id="phone" />
        <br />
        {userAdded?<div className="w3-panel w3-green w3-round-small w3-padding-16">New employee added successfully!</div>:''}<br />
        <button id="addEmployeeBTN" onClick={add} style={{marginRight:'5vw'}} className="limeButton w3-btn w3-border w3-border-black w3-round-large">Add Employee</button> 
      </div>
    </div>
  );
}
