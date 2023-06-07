import AddEmployee from "./addEmployee";
import DisplayEmployees from "./displayEmployees";

export default function MainContent() {
  return(
    <div id="mainContent">
        <DisplayEmployees/>
        <AddEmployee/>
    </div>
  );
}