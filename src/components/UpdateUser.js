
import React, { useState } from 'react'
import {getDatabase,ref, update} from 'firebase/database'
import {getStorage,ref as storageRef, uploadBytes,getDownloadURL} from 'firebase/storage'
import {app}from '../Firebase'
import { useNavigate, useLocation } from 'react-router-dom'
const UpdateUser = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const [name,setName] = useState(location.state[1].userName)
    const [admNumber,setAdmNumber] = useState(location.state[0])
    const [phone,setPhone] = useState(location.state[1].phoneNumber)
    const [seletedFile,setSelectedFile] = useState(null)
    
    const handleFileChange =(event)=>{
        const file = event.target.files[0]
        setSelectedFile(file)
    }


    //console.log(location);

   const submitHandler = async (event)=>{
    event.preventDefault();
    if(seletedFile){
        const db = getDatabase(app)
    const storage = getStorage(app)

    const myRef =storageRef(storage,`userImages/${admNumber}`)
    await uploadBytes(myRef,seletedFile)
    
    const imageUrl = getDownloadURL(myRef)

   const userRef = ref(db,'users/'+location.state[0])
   update(userRef,{userName:name,phoneNumber:phone,imageUrl: imageUrl}).then(res=>{
    navigate('/userList') 
   }).catch(e=>{
    console.log(e);
   })
    }else{
    const db = getDatabase(app)
    const userRef = ref(db,'users/'+location.state[0])
    update(userRef,{userName:name,phoneNumber:phone}).then(res=>{
    navigate('/userList') 
   }).catch(e=>{
    console.log(e);
   })
    }
   } 

  return (
    <div>
     <form onSubmit={submitHandler}>
        <input disabled value={admNumber} onChange={(e)=>setAdmNumber(e.target.value)} type='text' placeholder='Adm number'/> 
        <input value={name} onChange={(e)=>setName(e.target.value)} type='text' placeholder='user name'/>
        <input value={phone} onChange={(e)=>setPhone(e.target.value)} type='number' placeholder='phone number'/>
        <input onChange={handleFileChange} type='file'/>
       <button type='submit'>update</button>
     </form>
    </div>
  )
}

export default UpdateUser
