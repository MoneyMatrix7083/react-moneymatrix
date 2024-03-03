import React, { useEffect, useState } from 'react'
import {getDatabase,onValue,ref, remove} from 'firebase/database'
import {getStorage,ref as storageRef, deleteObject} from 'firebase/storage'
import {app} from '../Firebase'
import { useNavigate } from 'react-router-dom'
const UserList = () => {
    const [userData,setUserData] = useState(null)
    const navigate = useNavigate()
    useEffect(()=>{
        const db = getDatabase(app)
        const userRef = ref(db,'users')
        onValue(userRef,(snapshot)=>{
            const data = snapshot.val()
            console.log(data)
            setUserData(data)
        })

    },[])

    const deleteData =(key)=>{
        const db = getDatabase(app)
        const storage = getStorage(app)    
 
        const userRef = ref(db,'users/'+key);
        const myRef = storageRef(storage,'images/'+key)

        deleteObject(myRef)
        .then(res=>{
            remove(userRef)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
    <div>
       <h1>This is User List </h1>
    
       {userData && (
        <div> 
            {Object.entries(userData).map(([key,value])=>{
                return(    
                <div key={key}> 
                    <img alt='' style={{width:'20%'}} src={value.imageUrl}/>
                    <p>{value.userName} {value.phoneNumber}</p>
                    <button onClick={()=>{deleteData(key)}}>delete</button>
                    <button onClick={()=>{navigate('/dashboard/updateUser',{state:[key,value]})}} >Update</button>
               </div>
            )
        })}
        </div>
       )}
    </div>
  )
}

export default UserList
