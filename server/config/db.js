import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log('MongoDB Connected');
    } catch (err) {
        console.log('MongoDB connection error:', err)
        process.exit(1);
    }
}
export default connectDB;