import React, { useState } from 'react'
import {getFirestore, doc, updateDoc} from 'firebase/firestore'
import {getStorage,ref as storageRef, uploadBytes,getDownloadURL} from 'firebase/storage'
import {app} from '../Firebase'
import { useLocation, useNavigate } from 'react-router-dom'
const UpdateFaculty = () => {
    const location = useLocation(); 
    const navigate = useNavigate();
    console.log(location.state);

    const [name,setName] = useState(location.state.facultyName)
    const [phone,setPhone] = useState(location.state.phoneNumber)
    const [seletedFile,setSelectedFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(location.state.imageUrl);

    const handleFileChange =(event)=>{
        const file = event.target.files[0]
        setSelectedFile(file)
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Create a preview URL
            setPreviewUrl(imageUrl); // Set the preview URL state
          }
    }

    const submitHandler = async (event)=>{
    event.preventDefault();
    if (seletedFile) {

    const db = getFirestore(app)
    const storage = getStorage(app)

    const myRef =storageRef(storage,`userImages/${location.state.id}`)
    await uploadBytes(myRef,seletedFile)

    const imageUrl = await getDownloadURL(myRef)

        //console.log(name,"  ", phone)
        const docRef = doc(db,'History',location.state.id)
        try {
            await updateDoc(docRef,{facultyName:name, phoneNumber:phone, imageUrl:imageUrl});
            navigate('/facultyList');
        } catch (error) {
            
            console.log(error);
        }
        
    } else {
        const db = getFirestore(app)
    //console.log(name,"  ", phone)
    const docRef = doc(db,'History',location.state.id)
    try {
        
        await updateDoc(docRef,{facultyName:name, phoneNumber:phone});
        navigate('/facultyList');
    } catch (error) {
        
        console.log(error);
    }
    }
    
}

    return (
    <div>
      <h1> Update Faculty </h1>
    <form onSubmit={submitHandler}>
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder='full name'></input>
        <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder='phone number'></input>
        <input onChange={handleFileChange} type='file'/>
        <button type='submit'>update</button>
        {previewUrl && <img src={previewUrl} alt='Preview' style={{ width: '100px', height: '100px' }} />} {/* Display the image preview */}
       
    </form>
    </div>
  )
}

export default UpdateFaculty
