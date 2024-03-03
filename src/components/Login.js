import React, { useState } from 'react'
import{getAuth,signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider} from 'firebase/auth'
import {app} from '../Firebase'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email,setEmail] = useState('');
    const [password, setPasswrod] = useState('');
    

    const navigate = useNavigate();

    const submitHandler =(event)=>{
        event.preventDefault();
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth,email,password)
        .then(userData=>{
            console.log(userData);
            localStorage.setItem('token',userData.user.accessToken);
            navigate('/dashboard')     
        }).catch(err=>{
            console.log(err.code,err.message);
        })
    }

    const loginWithGoogle =()=>{
        const auth = getAuth(app);
        const provider= new GoogleAuthProvider()
         signInWithPopup(auth,provider)
         .then(res=>{
            console.log(res);
            localStorage.setItem('token',res.user.accessToken);
            navigate('/dashboard')
         }).catch(err=>{
            console.log(err);
         })
    }

    const loginWithFacebook =()=>{
        const auth = getAuth(app);
        const provider= new FacebookAuthProvider()
         signInWithPopup(auth,provider)
         .then(res=>{
            console.log(res);
           localStorage.setItem('token',res.user.accessToken);
            navigate('/dashboard')
         }).catch(err=>{
            console.log(err);
         })
    }

const sendOnSignUpScreen =()=>{
    navigate('/signup');
}

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <input onChange={(e)=>{setEmail(e.target.value)}} type='email' placeholder='email' />
        <input onChange={(e)=>{setPasswrod(e.target.value)}} type='password' placeholder='password'/>
        <button type='submit'>login</button>
        <button type='button' onClick={sendOnSignUpScreen} >Create New User</button>
        <br/>
        <br/>
        <button type='button' onClick={loginWithGoogle} >login with google</button>
        <br/>
        <br/>
        <button type='button' onClick={loginWithFacebook} >login with facebook</button>
        <br/>
        <br/>
       
      </form>
      
    </div>
  )
}

export default Login
