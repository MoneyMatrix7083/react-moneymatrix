import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div style={{display:'flex',flexDirection:'row'}}>
        <div style={{width:'20%',backgroundColor:'royalblue',height:'100vh'}}>
        <Link to='/addUser' style={{color:'white', display:'block'}}>AddUser</Link>
        <Link to='/userList' style={{color:'white', display:'block'}}>UserList</Link>
        <Link to='/addFaculty' style={{color:'white', display:'block'}}>Add Faculty</Link>
        <Link to='/facultyList' style={{color:'white', display:'block'}}>Faculty List</Link>
        </div>
        <div style={{width:'70%',height:'100vh'}}>
        <Outlet></Outlet>

        </div>

    </div>
  )
}

export default Dashboard
