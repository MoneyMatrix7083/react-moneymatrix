
import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import {app} from '../Firebase'
import {getAuth,onAuthStateChanged,signOut} from 'firebase/auth'

const Dashboard = () => {

    const navigate = useNavigate();
    
    const logOut =()=>{

    const auth= getAuth(app);

    signOut(auth).then(res=>{
      localStorage.clear();
      navigate('/login')
    });
  }

  useEffect(()=>{
    const auth = getAuth(app)
    const unsubscribe = onAuthStateChanged(auth,(user)=>{
      if(user){
        console.log('yes login', user);
      }else{
        console.log('yes not login')   
      }

    })
     return ()=> unsubscribe();

  },[]
  )
  return (
    <div style={{display:'flex',flexDirection:'row'}}>
        <div style={{width:'20%',backgroundColor:'royalblue',height:'100vh'}}>
        <Link to='/dashboard/addUser' style={{color:'white', display:'block'}}>AddUser</Link>
        <Link to='/dashboard/userList' style={{color:'white', display:'block'}}>UserList</Link>
        <Link to='/dashboard/addFaculty' style={{color:'white', display:'block'}}>Add Faculty</Link>
        <Link to='/dashboard/facultyList' style={{color:'white', display:'block'}}>Faculty List</Link>
        <br/>
        <button type='button' onClick={logOut} >SignOut</button>
        </div>
        <div style={{width:'70%',height:'100vh'}}>
        <Outlet></Outlet>

        </div>

    </div>
  )
}

export default Dashboard
