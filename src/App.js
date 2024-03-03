
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
//import AddData from './components/AddData';
import Dashboard from './components/Dashboard';
import AddUser from './components/AddUser';
import UserList from './components/UserList';
import UpdateUser from './components/UpdateUser';
import AddFaculty from './components/AddFaculty';
import FacultyList from './components/FacultyList';
import UpdateFaculty from './components/UpdateFaculty';
import Signup from './components/Signup';
import Login from './components/Login';
import {isLogin} from '../src/components/CheckAuth'

//router
const myRouter = createBrowserRouter([
  {path:'signup',Component:Signup},
  {path:'login',Component:Login},
  {path:'dashboard', loader:isLogin, Component:Dashboard,children:[
    {path:'',Component:UserList},
    {path:'addUser',Component:AddUser},
    {path:'userList',Component:UserList},
    {path:'updateUser',Component:UpdateUser},
    {path:'addFaculty',Component:AddFaculty},
    {path:'facultyList',Component:FacultyList},
    {path:'updateFaculty',Component:UpdateFaculty}
  ]}
])

function App() {
  return (
    <>
    <RouterProvider router={myRouter}/>
    </>
  );
}

export default App;
