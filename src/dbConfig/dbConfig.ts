import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log("Mongo DB Connected succesfully");
            
        })

        connection.on('error',(err)=>{
            console.log("MongoDB connection error.Please make sure MongoDB is Running " + err);
            process.exit();
            
            
        })


    }catch(err){
        console.log("Something went wrong");
        console.log(err);
        
        
    }
}