import {connect}from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs"




connect()

export async function POST(request:NextRequest){
    try{

        const reqBody = await request.json()
        const {username,email,password ,profilePic }=  reqBody
        console.log(reqBody);

        // check user exist

      const user =  await  User.findOne({email})

      if(user){
        return NextResponse.json({error:"User already exists"},{status:400})
      }
        

      // password hashing
      const salt =await bcryptjs.genSalt(10)
      const hashedpassword = await bcryptjs.hash(password,salt)

      const newUser =   new User({username,email,password:hashedpassword,profilePic , role:"GENERAL" })

      const savedUser = await newUser.save()

      console.log(savedUser,"savedUser");

      return NextResponse.json({
        message:"User Created Successfully",
        success:true,
        savedUser
      })
      


    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}