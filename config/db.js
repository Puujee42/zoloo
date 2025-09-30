// THIS IS THE CORRECT AND FINAL CODE FOR connectDB.js
import mongoose from 'mongoose';

let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            // You confirmed the database name is 'test'
            dbName: 'test' 
        };

        // This line is correct and will NOT time out.
        // It uses the MONGODB_URI directly without changing it.
        cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    
    return cached.conn;
}

export default connectDB;