const mongoose = require("mongoose");
const locationSchema=new mongoose.Schema({
    "city":String,
    "state":String
});
const jobSchema=new mongoose.Schema({
    location:{
        type:locationSchema,
        
    },
    title:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    skills:{
        type:Array,
        required:true
    },
    postDate:{
        type:Number,
        required:true
    }
});

mongoose.model("job", jobSchema, "jobs");