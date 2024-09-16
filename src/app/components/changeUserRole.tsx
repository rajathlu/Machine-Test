"use client"
import { useState } from "react"
import ROLE from "../common/role"
import { IoIosClose } from "react-icons/io";
import axios from "axios"
import toast from "react-hot-toast";

interface ChangeUserRoleProps {
  onClose: () => void;  // Specify the type for onClose
  name: string;             
  email: string;            
  role: string; 
  id:string;
  callFunc:()=> void;
}

export default function changeUserRole({ onClose,name, email, role ,id,callFunc }: ChangeUserRoleProps ) {

  // console.log(props,"props");
  
  const[userRole,setuserRole]=useState('')


  const handleChangeSelect =(e:any)=>{

    console.log(e.target.value,"handleChangeSelect");
    
    setuserRole(e.target.value)

  }

  const updateUserRole =async ()=>{

     
    const dataResp = axios.post('/api/users/updateUserRole', JSON.stringify({role:userRole,userId:id}) )

    const Response = await dataResp;
    console.log(Response,"Response");
    toast.success("User updated Successfully")
    onClose()
    callFunc()

    
     
  }
  return (
    <div className="fixed  top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-40"  >
       <div className="w-fit mx-auto bg-white shadow-md p-4 w-full max-w-sm " >
            <div><button className="block ml-auto"
             onClick={onClose} 
             >

             <IoIosClose/>
       </button>

      </div>
        <h1 className="pb-4 text-lg font-medium " >Change User Role</h1>
        <p>Name: {name}</p>
        <p>Email:{email}</p>
        <div className="flex items-center justify-between my-4" >
          <p>Role :</p>

        <select className="border px-4 py-1"  value={userRole} onChange={handleChangeSelect} >

         <option value={'GENERAL'} >General</option>
         <option value={'ADMIN'} >Admin</option>

        </select>
        </div>
        <button className="w-fit mx-auto block  py-1 px-3  rounded-full bg-red-600 text-white hover:bg-red-700" onClick={updateUserRole} >Change Role</button>
        
    
    </div>
    
    </div>
  )
}
