import {connect}from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";


connect()

export async function POST(request: NextRequest){
    try{

        console.log("Reacheddd Backend####################");
        


     const reqBody = await request.json()

     console.log(reqBody,"reqBody");
     
     const sessiouser = reqBody.userId;
    const{userId,email,name,role}= reqBody

    const payload = {
        ...(email && {email:email}),
        ...(name && {username:name}),
        ...(role && {role:role})
    }
    console.log(payload,"payload");
    

    const user = await User.findById(sessiouser)
    console.log(user.role,"user role$$$$$$$$$$$$$$");
    

    const updateUser = await User.findByIdAndUpdate(userId,payload)

    return NextResponse.json({
        message:"User Updated",
        success:true,
        error:false,
        data:updateUser
    })

    }catch(error:any){
        return NextResponse.json({error:error.message},{status:400})
    }


   
    

}