
import mongoose from "mongoose";


export const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('BD online');
    } catch (error) {
        console.log(error);
        throw new Error("Error en la BD");
        
    }
    
}