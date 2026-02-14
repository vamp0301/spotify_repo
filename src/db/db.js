const mongoose=require('mongoose');

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB');
    }
    catch(error){
        console.error('Error connecting to MongoDB:',error);
       /* process.exit(1); sending a signal to the process to terminate with an exit code of 1, which indicates that an error occurred.
    This is a common practice to indicate that the application encountered an error and is exiting. */
    }
}
module.exports=connectDB;