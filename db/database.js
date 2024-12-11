import mongoose from "mongoose";


const database =async ()=>{

    try {
        await mongoose.connect(process.env.Monogodb_URI)
        console.log("connect mongodb");
        
    } catch (error) {
        console.log("mongodb failed",error);
    }
}
export default database;