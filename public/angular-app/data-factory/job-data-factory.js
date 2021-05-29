angular.module("meanjobs").factory("jobDataFactory", jobDataFactory);
function jobDataFactory($http) {
    return {
        getAlljobs: getAlljobs,
        getOneJob: getOneJob,
        addJob:addJob,
        fullyUpdateJob:fullyUpdateJob,
        deleteJob:deleteJob,
    };
    function getAlljobs(number) {
        return $http.get("/api/job?offset="+number+"&"+"count=5")
            .then(complete)
            .catch(failed);
    }
    function getOneJob(id) {
        return $http.get("/api/job/"+id)
            .then(complete)
            .catch(failed);
    }
    function addJob(job) {
        return $http.post("/api/job/",job)
            .then(complete)
            .catch(failed);
    }
    function fullyUpdateJob(jobID,job) {
        return $http.patch("/api/job/"+jobID,job)
            .then(complete)
            .catch(failed);
    }
    function deleteJob(jobID) {
        return $http.delete("/api/job/"+jobID)
            .then(complete)
            .catch(failed);
    }
    function complete(response) {
        console.log(response.data);
        return response.data;
    }
    function failed(error) {
        return error.status.statusText;
    }
}