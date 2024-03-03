import React, { useState } from 'react'
import{getAuth,createUserWithEmailAndPassword} from 'firebase/auth'
import {app} from '../Firebase'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email,setEmail] = useState('');
    const [password, setPasswrod] = useState('');
    const navigate = useNavigate();

    const submitHandler =(event)=>{
        event.preventDefault();
        const auth = getAuth(app)
        createUserWithEmailAndPassword(auth,email,password)
        .then(res=>{
            console.log(res.user);
            navigate('/login')
        }).catch(err=>{
            console.log(err)
        })
    }
  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={submitHandler}>
        <input onChange={(e)=>{setEmail(e.target.value)}} type='email' placeholder='email' />
        <input onChange={(e)=>{setPasswrod(e.target.value)}} type='password' placeholder='password'/>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default Signup
