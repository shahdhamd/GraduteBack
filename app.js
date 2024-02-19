import  express  from "express";
import dotenv from 'dotenv'
import * as indexRouter from './src/modules/index.route.js'
import connectDB from "./DB/connection.js";
import cors from 'cors';
import compression from 'compression'
const app=express()
dotenv.config()
connectDB()
app.use(express.json())
const port=process.env.Port
const baseUrl=process.env.BASEURL
app.use(cors())
app.use(compression())
app.use(`${baseUrl}user`,indexRouter.userRouter)
app.use(`${baseUrl}auth`,indexRouter.authRouter)
app.use(`${baseUrl}herb`,indexRouter.herbRouter)
app.use(`${baseUrl}contribution`,indexRouter.contributionRouter)

app.use('*',(req,res)=>{
    res.status(400).json({message:'error invalid URL'})
})

app.listen(port,(req,res)=>{
    console.log(`running server ${port}`)
})
