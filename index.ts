import express, {Express, Request,Response} from "express";
const port =8000;

const app = express();

app.get("/",(req : Request,res : Response)=>{
    res.send("Node JS +  Express Js + TypeScript ")
});

app.get("/end_point_1",(req : Request,res : Response)=>{
    res.send("This is end point 1. Any user can access via this URL")
});

app.listen(port,()=>{
    console.log(`now listening on port ${port}`);
});
