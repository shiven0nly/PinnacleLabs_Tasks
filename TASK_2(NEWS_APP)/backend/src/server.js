import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


PORT = process.env.PORT || 5000;

const app = express () ;

app.listen(process.env.PORT,()=>{
    console.log(`server is running at ${PORT}`);
}    
)