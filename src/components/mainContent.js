import { useState } from "react";
import AddEmployee from "./addEmployee";
import DisplayEmployees from "./displayEmployees";

export default function MainContent() {
  const [whosOnDisplay,setWhosOnDisplay] = useState(1);

  if(whosOnDisplay===2)
  {
    return(<div id="mainContent"><DisplayEmployees whosOnDisplay={whosOnDisplay} setWhosOnDisplay={setWhosOnDisplay}/></div>);
  }

  return(<div id="mainContent"><AddEmployee whosOnDisplay={whosOnDisplay} setWhosOnDisplay={setWhosOnDisplay}/></div>);
}