"use client"

import axios from "axios"
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../components/Header";
export default function profilePage() {
  const router = useRouter()
  const[data,setData]=useState('nothing');
  const[user,setUser]=useState();
  const [inputValue, setInputValue] = useState<string>(""); // To track the input value
  const [result, setResult] = useState<number | null>(null); // To store the result

  console.log(data,"data");
  
  useEffect(()=>{
    getUserDetails()
  },[])



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

  const getUserDetails = async ()=>{
   const res =  await axios.get('/api/users/me')
    console.log(res.data,"res data");
    setData(res.data._id)
    setUser(res.data.data)
    
  }

  const handleInput = (value: string) => {
    setInputValue((prevValue) => prevValue + value);
  };

  // Function to clear input
  const handleClear = () => {
    setInputValue("");
    setResult(null);
  };
  const handleCalculate = () => {
    try {
      const calculatedResult = eval(inputValue); // Evaluates the input as a math expression
      setResult(calculatedResult);
    } catch (error) {
      alert("Invalid calculation");
    }
  };
  return (<>
  <Header data={user}  />
    <div className="flex flex-col items-center justify-center min-h-screen py-2" >
      
        <h1>Profile</h1>
        <hr/>
        <p>Calculator</p>
        
        <hr/>
      
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h1 className="text-2xl font-bold text-center mb-4"> Calculator</h1>
        <div className="bg-gray-100 p-4 mb-4 text-right rounded-md">
          <p className="text-xl">{inputValue || "0"}</p>
          {result !== null && <h2 className="text-2xl font-bold">= {result}</h2>}
        </div>

        <div className="grid grid-cols-4 gap-4">
         
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((num) => (
            <button
              key={num}
              onClick={() => handleInput(num)}
              className="bg-blue-500 text-white p-4 rounded-lg text-lg font-bold hover:bg-blue-600"
            >
              {num}
            </button>
          ))}

          {/* Operator buttons */}
          {["+", "-", "*", "/"].map((operator) => (
            <button
              key={operator}
              onClick={() => handleInput(operator)}
              className="bg-yellow-500 text-white p-4 rounded-lg text-lg font-bold hover:bg-yellow-600"
            >
              {operator}
            </button>
          ))}

          {/* Clear button */}
          <button
            onClick={handleClear}
            className="col-span-2 bg-red-500 text-white p-4 rounded-lg text-lg font-bold hover:bg-red-600"
          >
            Clear
          </button>

          {/* Equal button */}
          <button
            onClick={handleCalculate}
            className="col-span-2 bg-green-500 text-white p-4 rounded-lg text-lg font-bold hover:bg-green-600"
          >
            =
          </button>
        </div>
      </div>
    </div>
    </div> </>
  )
}
