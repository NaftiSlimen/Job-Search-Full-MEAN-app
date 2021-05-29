const mongoose = require("mongoose");
const jobDB = mongoose.model("job");

const showAll = function (req, res) {
    const response = {
        status: 200,
    };
    var offset=0;
    var count=5;
    if (req.query.offset&&req.query.count){
        offset=parseInt(req.query.offset);
        count=parseInt(req.query.count);
    }
    console.log(offset);
    console.log(count);
    jobDB.find().skip(offset).limit(count).exec(function(err,jobs){
        if (err){
            response.status=500;
            console.log(err);
            response.message=err;
        }else{
            response.message=jobs;
            console.log(response.message);
        };
        res.status(response.status).json(response.message);
    })
    
}

const addJob = function (req, res) {
    const response = {
        status: 200,
        message: "job added"
    };
    jobDB.create({
        "location": req.body.location,
        "title": req.body.title,
        "salary": req.body.salary,
        "description": req.body.description,
        "experience": req.body.experience,
        "skills": req.body.skills.split(","),
        "postDate": req.body.postDate
    }, function (err, createdJob) {
        if (err) {
            response.status = 400;
            console.log(err);
            response.message = err;
        } else {
            response.status = 201;
            response.message = { "message": "job created" };
        }
    });
    res.status(response.status).json(response.message);   
}

const removeJob = function (req, res) {
    const jobId=req.params.jobID;
    const response = {
        status: 204,
        message: "job deleted"
    };
    jobDB.findByIdAndRemove(jobId).exec(function(err,job){
        if (err) {
            response.status = 400;
            console.log(err);
            response.message = err;
        } else {
            response.message = job;
        } 
        res.status(response.status).json(response.message);
    })
}

const showJob = function (req, res) {
    const jobId=req.params.jobID;
    const response = {
        status: 200,
        message: "job found"
    };
    jobDB.findById(jobId).exec(function(err,job){
        if (err) {
            response.status = 400;
            console.log(err);
            response.message = err;
        } else {
            response.message = job;
        } 
        res.status(response.status).json(response.message);
    })
}   

const fullyUpdateJob = function (req, res) {
    const jobId=req.params.jobID;
    const response = {
        status: 200,
        message: "job fully edited"
    };
    jobDB.findById(jobId).exec(function(err,job){
        if (err) {
            response.status = 400;
            console.log(err);
            response.message = err;
        } else {
            if (req.body.location&&req.body.title&&req.body.salary&&req.body.description&&req.body.experience&&req.body.skills&&req.body.postDate){
                job.location=req.body.location;
                job.title=req.body.title;
                job.salary=req.body.salary;
                job.description=req.body.description;
                job.experience=req.body.experience;
                job.skills=req.body.skills.split(",");
                job.postDate=req.body.postDate;
                job.save(function(err,updatetJob){
                    if (err) {
                        response.status = 500;
                        response.message = err;
                    }
                    response.message = { "message": "job fully updated" };
                });
            }
        } 
        res.status(response.status).json(response.message);
    })
}

const partiallyUpdateJob = function (req, res) {
    const jobId=req.params.jobID;
    const response = {
        status: 200,
        message: "job partially edited"
    };
    jobDB.findById(jobId).exec(function(err,job){
        if (err) {
            response.status = 400;
            console.log(err);
            response.message = err;
        } else {
            if (req.body.location||req.body.title||req.body.salary||req.body.description||req.body.experience||req.body.skills||req.body.postDate){
                if (req.body.location&&req.body.location.city&&req.body.location.state) job.location=req.body.location;
                if (req.body.title) job.title=req.body.title;
                if (req.body.salary) job.salary=req.body.salary;
                if (req.body.description) job.description=req.body.description;
                if (req.body.experience) job.experience=req.body.experience;
                if (req.body.skills) job.skills=req.body.skills.split(",");
                if (req.body.postDate) job.postDate=req.body.postDate;
                job.save(function(err,updatetJob){
                    if (err) {
                        response.status = 500;
                        response.message = err;
                    }
                    response.message = { "message": "job partially updated" };
                });
            }
        } 
        res.status(response.status).json(response.message);
    })
}

module.exports={
    showAll:showAll,
    addJob:addJob,
    removeJob:removeJob,
    showJob:showJob,
    fullyUpdateJob:fullyUpdateJob,
    partiallyUpdateJob:partiallyUpdateJob

}






