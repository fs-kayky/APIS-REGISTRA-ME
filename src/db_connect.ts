import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/registra-me");
        console.log("Conectado ao Mongo");
    } catch (error) {
        console.log("Erro ao conectar ao Mongo", error);
    }	
}

export default dbConnect;