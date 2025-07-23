import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI!;

if(!MONGO_URI) {
    throw new Error("Please define the MONGO_URI environment variable inside .env.local");
}

let cached = global.mongoose;

if(!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
    if(cached.conn) {
        return cached.conn;
    }

    if(!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => {   
            return mongoose.connection;
        })
    }
    

    try {
        console.log("entered in try block")
        cached.conn = await cached.promise;
    }catch (error) {
        cached.promise = null;
        console.error("🔥 MongoDB connection failed:", error); 
        throw new Error("Failed to connect to MongoDB");
    }

    console.log("db connect...");
    return cached.conn;
}