// mongodb://localhost:27017

const express= require('express');
const mongoose = require('mongoose');
const app=express();
const PORT=5000;
const cors=require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://0.0.0.0:27017/crud")
.then(()=>{
    console.log("DB Connect successfuly");
})
.catch((error)=>{
    console.log("Error : "+error);
})

// Createing schemea
const userSchema=mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    country:{
        type: String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    about:{
        type:String,
        required:true
    }
},
{timestamps:true}
);

const User=mongoose.model("User",userSchema);

//Create User API

app.post("/createuser", async (req,res)=>{
    try {
        const bodyData=req.body;
        const user = new User(bodyData);
        const userData = await user.save();
        res.send(userData);
        
    } catch (error) {
        res.send(error);
    }
});

//Readall User API

app.get("/readalluser",async(req,res)=>{
    try {
        const userData = await User.find({});
        res.send(userData);

    } catch (error) {
        res.send(error);
    }
});

//Readone User API

app.get("/read/:id",async(req,res)=>{
    try {
        const id = req.params.id;
        const user = await User.findById({_id:id});
        res.send(user);
    } catch (error) {
        res.send(error);
    }
});

//Update User API

app.put("/updateuser/:id",async(req,res)=>{
    try {
        const id = req.params.id;
        const user = await User.findByIdAndUpdate({_id:id},req.body,{new:true});
        res.send(user);
        
    } catch (error) {
        res.send(error);
    }
});

//delete User API

app.delete("/delete/:id", async(req,res)=>{
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete({_id:id});
        res.send(user);
        
    } catch (error) {
        res.send(error);
    }
});


app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})

