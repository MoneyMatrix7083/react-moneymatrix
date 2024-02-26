
import React, { useState } from 'react'
import {getDatabase,ref,set} from 'firebase/database'
import {getStorage,ref as storageRef, uploadBytes,getDownloadURL} from 'firebase/storage'
import {app}from '../Firebase'
import { useNavigate } from 'react-router-dom'
const AddUser = () => {
    const [name,setName] = useState('')
    const [admNumber,setAdmNumber] = useState(null)
    const [phone,setPhone] = useState(null)
    const [seletedFile,setSelectedFile] = useState(null)
    const navigate = useNavigate()

    const handleFileChange =(event)=>{
        const file = event.target.files[0]
        setSelectedFile(file)
    }

    const submitHandler = async (event)=>{
    event.preventDefault();
    const db = getDatabase(app)
    const storage = getStorage(app)

    const myRef =storageRef(storage,`userImages/${admNumber}`)
    await uploadBytes(myRef,seletedFile)

    const imageUrl = getDownloadURL(myRef)

    set(ref(db,'users/'+admNumber),{
        userName:name,
        phoneNumber:phone,
        imageUrl: imageUrl
    }).then(res=>{ 
        navigate('/userList')
    }).catch(e=>{
        console.log(e);
    })
    console.log(name,phone);
   } 

  return (
    <div>
     <form onSubmit={submitHandler}>
        <input onChange={(e)=>setAdmNumber(e.target.value)} type='text' placeholder='Adm number'/> 
        <input onChange={(e)=>setName(e.target.value)} type='text' placeholder='user name'/>
        <input onChange={(e)=>setPhone(e.target.value)} type='number' placeholder='phone number'/>
        <input onChange={handleFileChange} type='file'/>
        <button type='submit'>submit</button>
     </form>
    </div>
  )
}

export default AddUser
