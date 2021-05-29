const mongoose = require("mongoose");
const jobDB = mongoose.model("job");


const showLocation = function (req, res) {
    const jobId = req.params.jobID;
    const response = {
        status: 200,
    };
    jobDB.findById(jobId).exec(function (err, job) {
        if (err) {
            response.status = 500;
            console.log(err);
            response.message = err;
        } else if (!job) {
            response.status = 400;
            response.message = { "message": "job not found" };
        } else {
            response.message = job.location;
        }
        res.status(response.status).json(response.message);
    })
}

const addLocation = function (req, res) {
    const jobId = req.params.jobID;
    const response = {
        status: 200,
    };
    jobDB.findById(jobId).exec(function (err, job) {
        if (err) {
            response.status = 500;
            console.log(err);
            response.message = err;
        } else if (!job) {
            response.status = 400;
            response.message = { "message": "job not found" };
        } else {
            if (!job.location) {
                if (req.body.city && req.body.state) {
                    job.location = { city: req.body.city, state: req.body.state }
                    job.save(function (err, updatedJob) {
                        if (err) {
                            response.status = 500;
                            response.message = err;
                        }
                        else {
                            response.status = 200;
                            response.message = { "message": "location added!" };
                        }
                    })
                    response.message = { "message": "job location added!" };
                } else {
                    response.status = 400;
                    response.message = { "message": "Invalid inputs!" };
                }
            } else {
                response.status = 400;
                response.message = { "message": "location already exists, use update instead" };
            }

        }
        res.status(response.status).json(response.message);
    })
}

const deleteLocation = function (req, res) {
    const jobId = req.params.jobID;
    const response = {
        status: 200,
    };
    jobDB.findById(jobId).exec(function (err, job) {
        if (err) {
            response.status = 500;
            console.log(err);
            response.message = err;
        } else if (!job) {
            response.status = 400;
            response.message = { "message": "job not found" };
        } else {
            if (job.location) {
                job.location.remove();
                job.save(function (err, updatedJob) {
                    if (err) {
                        response.status = 500;
                        response.message = err;
                    }
                    else {
                        response.status = 200;
                        response.message = { "message": "location deleted!" };
                    }
                })
            } else {
                response.status = 400;
                response.message = { "message": "location already exists, use update instead" };
            }

        }
        res.status(response.status).json(response.message);
    })





}

const fullyUpdateLocation = function (req, res) {
    const jobId = req.params.jobID;
    const response = {
        status: 200,
    };
    jobDB.findById(jobId).exec(function (err, job) {
        if (err) {
            response.status = 500;
            console.log(err);
            response.message = err;
        } else if (!job) {
            response.status = 400;
            response.message = { "message": "job not found" };
        } else {
            if (job.location) {
                if (req.body.city && req.body.state) {
                    job.location = { city: req.body.city, state: req.body.state }
                    job.save(function (err, updatedJob) {
                        if (err) {
                            response.status = 500;
                            response.message = err;
                        }
                        else {
                            response.status = 200;
                            response.message = { "message": "location fully upadated!" };
                        }
                    })
                } else {
                    response.status = 400;
                    response.message = { "message": "invalit update inputs!" };
                }
            } else {
                response.status = 400;
                response.message = { "message": "location does not exist, use create to make one instead" };
            }

        }
        res.status(response.status).json(response.message);
    })
}

const partiallyUpdateLocation = function (req, res) {
    const jobId = req.params.jobID;
    const response = {
        status: 200,
    };
    jobDB.findById(jobId).exec(function (err, job) {
        if (err) {
            response.status = 500;
            console.log(err);
            response.message = err;
        } else if (!job) {
            response.status = 400;
            response.message = { "message": "job not found" };
        } else {
            if (job.location) {
                if (req.body.city || req.body.state) {
                    console.log("hereeeeeee");
                    if (req.body.city) job.location.city = req.body.city;
                    if (req.body.state) job.location.state = req.body.state;

                    job.save(function (err, updatedJob) {
                        if (err) {
                            response.status = 500;
                            response.message = err;
                        }
                        else {
                            response.status = 200;
                            response.message = { "message": "location partially upadated!" };
                        }
                    })
                } else {
                    response.status = 400;
                    response.message = { "message": "invalit update inputs!" };
                }
            } else {
                response.status = 400;
                response.message = { "message": "location does not exist, use create to make one instead" };
            }

        }
        res.status(response.status).json(response.message);
    })
}

module.exports = {
    showLocation: showLocation,
    addLocation: addLocation,
    deleteLocation: deleteLocation,
    partiallyUpdateLocation: partiallyUpdateLocation,
    fullyUpdateLocation: fullyUpdateLocation,

}