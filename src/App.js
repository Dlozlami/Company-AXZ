import './App.css';
import React, { useState, useEffect } from "react";

function App() {
  const [employees, setEmployees] = useState([]);

  const getData = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:4000/Employees", requestOptions)
      .then((response) => response.json())
      .then((result) => setEmployees(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='flexContainer'>
      {employees.map((employees) => (
        <div key={employees.id}>
          <h3>
            <span>{employees.id}</span> {employees.name} {employees.surname}
          </h3>
          <p>{employees.body}</p>
          <img src={employees.pic} alt={employees.name} className='imgSize'></img>
        </div>
      ))}
    </div>
  );
}

export default App;
