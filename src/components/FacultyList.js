import React, { useEffect, useState } from 'react'
import {app} from '../Firebase'
import {collection,  deleteDoc, doc, getDocs,getFirestore} from 'firebase/firestore'
import {getStorage,ref as storageRef, deleteObject, getDownloadURL} from 'firebase/storage'
import { useNavigate } from 'react-router-dom';
const FacultyList = () => {
   const [facultyData, setFacultyData] = useState([]);
   const navigate = useNavigate();
    useEffect( ()=>{
      getData()
    },[])
  
    const getData = async ()=>{
        const db = getFirestore(app)
        const collectionRef = collection(db,'History')
        const docSnap = await getDocs(collectionRef)
        const data = docSnap.docs.map(doc=>({
            id:doc.id,
            ...doc.data()
        }))
        console.log(data)
        setFacultyData(data)
    }

    const deleteData = async (id)=>{
        const db = getFirestore(app);
        const storage = getStorage(app)    

        const collectionRef = doc(db,'History',id)
        const myRef = storageRef(storage,'userImages/'+id)
        
        
    try {
        // Check if the object exists before trying to delete it
        await getDownloadURL(myRef);
        // If the object exists, delete it
        await deleteObject(myRef);
        await deleteDoc(collectionRef);
        getData();
    } catch (error) {
        // If the object does not exist or there is an error, log the error
        console.log(error);
        await deleteDoc(collectionRef);
        getData();
    }  
         
    }


    return (
    <div>
      <h1> Faculty List </h1>
    {facultyData.map(faculty=>{
        
        return(
            <div key={faculty.id}>
                <img alt='' style={{width:'20%'}} src={faculty.imageUrl}/>
                <p> {faculty.facultyName} {faculty.phoneNumber}</p>
                <button onClick={()=>{deleteData(faculty.id)}} >delete</button>
                <button onClick={()=>{navigate('/updateFaculty',{state:faculty})}}>Update</button>
              </div>
        )
    
    })}
    </div>
  )

}
export default FacultyList
