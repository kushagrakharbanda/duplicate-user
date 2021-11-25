import {  Switch } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Authenticate from './Authenticate.js'
import EditUser from "./Components/User/EditUser";
import ViewUser from "./Components/User/ViewUser";
import AddBank from "./Components/Bank/AddBank";
import AddPersonal from "./Components/Personal/AddPersonal";
import EditBank from "./Components/Bank/EditBank";
import EditPersonal from "./Components/Personal/EditPersonal"
import AddUser from "./Components/User/AddUser";
import AllUsers from "./Components/User/AllUsers";
import SignUp from "./Components/Auth/SignUp"
import Unauthenticate from './Unauthenticate.js.js';
import AddDepartment from './Components/Department/AddDepartment'
import AllDepartment from './Components/Department/AllDepartment'
import EditDepartment from './Components/Department/EditDepartment'
import Login from "./Components/Auth/Login"
import WrongRoute from "./WrongRoute";
import AddClient from './Components/Client/AddClient'
import AllClient from './Components/Client/AllClient'
import EditClient from './Components/Client/EditClient'
import AddProject from './Components/Project/AddProject' 
import AllProject from './Components/Project/AllProject' 
import EditProject from './Components/Project/EditProject' 

function App() {
  return (

    <div className="App">
      <Navbar />
      <Switch>
        <Unauthenticate exact path="/login" component={Login} />
        <Unauthenticate exact path="/register" component={SignUp} />
        <Authenticate exact path="/addDepartment" component={AddDepartment} />
        <Authenticate exact path="/allDepartment" component={AllDepartment} />
        <Authenticate exact path="/editDepartment/:id" component={EditDepartment} />
        <Authenticate exact path="/addProject" component={AddProject} />
        <Authenticate exact path="/allProject" component={AllProject} />
        <Authenticate exact path="/editProject/:id" component={EditProject} />

        <Authenticate exact path="/addClient" component={AddClient} />
        <Authenticate exact path="/allClient" component={AllClient} />
        <Authenticate exact path="/editClient/:id" component={EditClient} />

        <Authenticate exact path="/add" component={AddUser} />
        <Authenticate exact path="/all" component={AllUsers} />
        <Authenticate exact path="/edit/:id" component={EditUser} />
        <Authenticate exact path="/view/:id" component={ViewUser} />
        <Authenticate exact path="/addBank/:id" component={AddBank} />
        <Authenticate exact path="/editBank/:id" component={EditBank} />
        <Authenticate exact path="/addPersonal/:id" component={AddPersonal} />
        <Authenticate exact path="/editPersonal/:id" component={EditPersonal} />
        <WrongRoute />
      </Switch>
    </div>
  );
}

export default App;
