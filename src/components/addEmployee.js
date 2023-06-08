import axios from "axios";
import React, { useState } from "react";


//This component will known as State 1


export default function AddEmployee({whosOnDisplay,setWhosOnDisplay}) {

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

    axios.post("http://localhost:4000/Employees", updatedInputValues)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const showAll = ()=>{

    setWhosOnDisplay(2);
    console.log(whosOnDisplay);
  };

  return (
    <div className="flexHorizontal w3-card-4 w3- -large" style={{width:'90vw',marginBottom:'5vh'}}>
      <div className="sideArtPanelAdd">
        <h1 style={{fontWeight:'900',paddingLeft:"0.5vw",backgroundColor:'black'}}>Welcome to AXZ</h1>
        <h4 style={{paddingLeft:"0.5vw",backgroundColor:'black'}}>Add a new employee</h4>
      </div>
      <div className="formStyles">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" />
        <br /><br />
        <label htmlFor="surname">Surname</label>
        <input type="text" id="surname" />
        <br /><br />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
        <br /><br />
        <label htmlFor="bio">Bio</label>
        <input type="text" id="bio" />
        <br /><br />
        <label htmlFor="pic">Upload photo</label>
        <input type="file" accept="image/*" id="pic" onChange={handleImageUpload} />
        <br /><br />
        <label htmlFor="birthday">Date of birth</label>
        <input type="date" id="birthday" />
        <br /><br />
        <label htmlFor="position">Job title</label>
        <input type="text" id="position" />
        <br /><br />
        <label htmlFor="phone">Phone</label>
        <input type="text" id="phone" />
        <br /><br />
        <button onClick={add} style={{marginRight:'5vw'}} className="limeButton w3-btn w3-border w3-border-black w3-round-large">Add Employee</button> 
        <button onClick={showAll} className="limeButton w3-btn w3-border w3-border-black w3-round-large">Display All Employees</button>
      </div>
    </div>
  );
}
