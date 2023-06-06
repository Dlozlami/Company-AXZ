import axios from "axios";
import React, { useState } from "react";

export default function AddEmployees() {

  const [inputValues, setInputValues] = useState({
    name: "",
    surname: "",
    email: "",
    bio: "",
    pic: "",
    birthday: "",
    position: "",
    phone: "",
  });

  const handleClick = () => {
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

    setInputValues(updatedInputValues);

    axios.post("http://localhost:4000/Employees", updatedInputValues)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="htmlFormStyles">
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
      <br />
      <input type="text" id="phone" />
      <br />
      <button onClick={handleClick}>Add Employee</button>
    </div>
  );
}
