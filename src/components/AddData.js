import React from 'react'
import {getDatabase,ref,set} from "firebase/database"
import {app} from '../Firebase'
const AddData =()=>{

    const addData =(userId,name,phone)=>{
        console.log(userId,name,phone);
        const db = getDatabase(app);
        set(ref(db,'users/'+userId),{
            userName:name,
            phone:phone
        })

    }
  return (
    <div>
      <h1>Add Data</h1>
      <button onClick={()=>{addData(456,"roshan",7083)}}>add data</button> 
    </div>
  )
}

export default AddData
