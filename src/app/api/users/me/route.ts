import { getDataFromToken } from "@/helpers/getDataFromToken";

// getDataFromToken

import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";


connect()

export async function GET(request:NextRequest){
    try{
     

        
        const userId = await getDataFromToken(request)
        
        
          // const used = await User.findOne({_id: userId})
          const user = await User.findOne({ _id: userId });
          
          return NextResponse.json({
            message:"User Found",
            // data:user
            data:user

          })
          
    }catch(error:any){
        return NextResponse.json({error:error.message},{status:400})
    }
}


