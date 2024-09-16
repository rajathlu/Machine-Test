"use client"
import axios from "axios"
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { FaUserCircle } from "react-icons/fa";
import moment from "moment";
import { CiEdit } from "react-icons/ci";
import ChangeUserRole from "../components/changeUserRole";
interface User {
    profilePic?: string;
    username: string;
    role: string;
  }
  
  interface AllUser {
    name: string;
    email: string;
    role: string;
    _id:string,
    createdAt: string;
    username:string
  }
  

export default function page() {
  const router = useRouter();

    const[user,setUser]=useState<User | null>(null);
    const[allUsers,setallUsers]=useState<AllUser[]>([]);

    const[openUpdateUser,setOpenUpdateUser]=useState(false);

    const[updateUserDetails,setUpdateUserDetails]=useState({email:"",name:"",role:"",_id:""})

    // console.log(updateUserDetails,"updateUserDetails");
    

    useEffect(()=>{
        getUserDetails()
        getAllUsers()
      },[])

      useEffect(()=>{
        if(user !== null && user?.role !== "ADMIN")
          {

            console.log("Allow adminnn");
            

            router.push("/profile")

        }

      },[user])

      console.log(user,"user");
      

      const getUserDetails = async ()=>{
        const res =  await axios.get('/api/users/me')
         setUser(res.data.data)
       }

       const getAllUsers = async ()=>{
        const res = await axios.get('/api/users/allUsers')
        setallUsers(res.data.data)
       }
  return (
    <>
    <Header data={user}  />
    <div className="min-h-[calc(100vh-120px)] md:flex hidden  ">
      <aside className="bg-white min-h-full w-full max-w-60 customShadow  ">
        <div className="h-32 flex justify-center items-center flex-col ">
          <div className="text-8xl cursor-pointer relative flex justify-center ">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-20 h-20 rounded-full"
                alt={user?.username}
              />
            ) : (
              <FaUserCircle />
            )}
          </div>
          <p className="capitalize text-lg font-semibold ">{user?.username}</p>
          <p className="text-sm">{user?.role}</p>
        </div>
        <div>
        
        </div>
      </aside>
      <main className="w-full h-full p-2" >
       {/* all userssss */}

       <table className="w-full  " >
      <thead>
        <tr>
        <th  >SL.No</th>
        <th >Name</th>
        <th >Email</th>

        <th >Role</th>
        <th >Created Date</th>
        <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          allUsers.map((el,index)=>{
            return(
              <tr className="text-center" >
                <td>{index+1}</td>
                <td>{el?.username}</td>
                <td>{el?.email}</td>

                <td>{el?.role}</td>
                <td>{moment(el?.createdAt).format('ll')}</td>
                <td>
                  <button className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white" 
                  onClick={()=>{
                    setUpdateUserDetails(el);
                    setOpenUpdateUser(true)

                    }}  ><CiEdit/></button>
                  
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>

    {openUpdateUser ? 


<ChangeUserRole onClose={()=>setOpenUpdateUser(false)} 
 name={updateUserDetails.name}                         
 email={updateUserDetails.email}
 role={updateUserDetails.role}
 id={updateUserDetails._id}
 callFunc={()=>getAllUsers()}

 />
:null}
    
    
      </main>
    </div>
    
    </>
  )
}
