import {connect}from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";

connect()

export async function GET(request:NextRequest){

    try{
        const allUsers = await User.find()

        return NextResponse.json({
            message:"All Users",
            data:allUsers
        })
    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }

}