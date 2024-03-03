import React, { useState } from 'react'
import {collection,addDoc, doc, updateDoc, getFirestore} from 'firebase/firestore'
import {getStorage,ref as storageRef, uploadBytes,getDownloadURL} from 'firebase/storage'
import {app} from '../Firebase'
import { useNavigate } from 'react-router-dom'

const AddFaculty = () => {
    const [name,setName] = useState('')
    const [phone,setPhone] = useState(null)
    const [seletedFile,setSelectedFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null);
    
    const navigate = useNavigate();

    const handleFileChange =(event)=>{
        const file = event.target.files[0]
        setSelectedFile(file)
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Create a preview URL
            setPreviewUrl(imageUrl); // Set the preview URL state
          }
    }

    // For Add Faculty with Image
    const submitHandler = async (event)=>{
    event.preventDefault();
    
    // First Add Data
    const db = getFirestore(app)
    console.log(name,"  ", phone)
    const docRef = await addDoc(collection(db,'History'),{
        facultyName:name,
        phoneNumber:phone,
        imageUrl:""
    })
    console.log(docRef.id)
   
    
    addImageAfter(docRef.id)
    
   
}

// Then Add Image 
const addImageAfter= async (id)=>{
const db = getFirestore(app)
const storage = getStorage(app)
    
const myRef =storageRef(storage,`userImages/${id}`)
await uploadBytes(myRef,seletedFile)

const imageUrl = await getDownloadURL(myRef)

// add image Url
const docRef2 = doc(db,'History',id)
try {
       await updateDoc(docRef2,{ imageUrl:imageUrl});
       navigate('/dashboard/facultyList');
   } catch (error) {
       
       console.log(error);
}
    

   }

    return (
    <div>
      <h1> Add Faculty </h1>
    <form onSubmit={submitHandler}>
        <input onChange={(e)=>setName(e.target.value)} placeholder='full name'></input>
        <input onChange={(e)=>setPhone(e.target.value)} placeholder='phone number'></input>
        <input onChange={handleFileChange} type='file'/>
        {previewUrl && <img src={previewUrl} alt='Preview' style={{ width: '100px', height: '100px' }} />} {/* Display the image preview */}
        <button type='submit'>submit</button>
    </form>
    </div>
  )
}

export default AddFaculty
