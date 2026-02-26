import express from "express";     //express is a framework to build APIs and servers
import cookieParser from "cookie-parser";
import cors from "cors"
import { connectDB } from "./utils/db.js";
import dotenv from "dotenv"
import userroute from "./routes/userroute.js" 
import companyroute from "./routes/companyroute.js"
import jobroute from "./routes/jobroute.js"
import applicationroute from "./routes/applicationroute.js"

dotenv.config({});

const app = express();       //It makes new Express server and app is used to run server

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

const corsOptions = {
    origin: [
        "http://localhost:3000",
        "https://hire-mee.vercel.app" 
    ],
    credentials: true
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

app.use("/api/v1/user", userroute)
app.use("/api/v1/company", companyroute)
app.use("/api/v1/job", jobroute)
app.use("/api/v1/application", applicationroute)


app.listen(PORT,()=>{ 
    connectDB()     
    console.log('server is running on port 5000')
})