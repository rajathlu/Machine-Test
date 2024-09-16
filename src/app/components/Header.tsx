"use client"
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";




export default function Header(props:any ) {
    console.log(props.data,"propss");
    const router = useRouter();
  const [menuDisplay,setMenuDisplay]=useState(false);


  const logout = async ()=>{
    try{

      await axios.get('/api/users/logout')
      toast.success("Logout Successful")
      router.push('/login')
    }catch(error:any){
      console.log(error.message);
      toast.error(error.message)
      

    }

  }
  return (
    <header className="h-16 shadow-md bg-white ">
    <div className="h-full  container mx-auto px-6 flex items-center px-4 justify-between ">
      <div className="">
        {" "}
        <Link href="/">
          {/* <Logo w={90} h={50} /> */}
        </Link>
      </div>
      <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2 ">
        <input
          type="text"
          placeholder="Search product here.."
          className="w-full outline-none "
        />
        <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white ">
          <CiSearch />
        </div>
      </div>
      <div className="flex items-center gap-7">
        <div className="relative  flex justify-center" onClick={()=>setMenuDisplay(prev => !prev)} >
          <div className="text-3xl cursor-pointer">
            {props?.data?.profilePic ? (
              <img
                src={props.data.profilePic}
                className="w-10 h-10 rounded-full"
                alt={props?.name}
              />
            ) : (
              <FaUserCircle />
            )}
           
          </div>
          {
            menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded " >

                <nav>
                {props?.data.role === "ADMIN" && (
                   <Link href="adminPanel"  className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2" >Admin Panel</Link>
                   
                  )}
                  </nav>
             
  
            </div>

            )

          }
         
        </div>
        
        <div className="text-2xl relative">
          <span>
            {" "}
            <FaShoppingCart />
          </span>

          <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3 ">
            <p className="text-xs">0</p>
          </div>
        </div>
        <div>
          {props.data?._id ? (
            <button
              onClick={logout}
              className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700 "
            >
              Logout
            </button>
          ) : (
            <Link
              href="login"
              className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700 "
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  </header>
  )
}
