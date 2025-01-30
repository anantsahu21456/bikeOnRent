import dotenv from 'dotenv'
dotenv.config()
import app from './app.js'

import databaseconnection from "./db/connection.db.js";

databaseconnection()
.then(()=>{
    app.listen(`${process.env.PORT}`,()=>{
        console.log(`server is running on port: ${process.env.PORT}`)
    })
})
.catch((error)=>
{
    console.error(`mongodb connection failed !!!` , error);
})
