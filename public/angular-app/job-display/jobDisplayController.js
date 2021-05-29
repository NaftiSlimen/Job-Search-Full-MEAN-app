angular.module("meanjobs").controller("jobDisplayController", jobDisplayController);
function jobDisplayController(jobDataFactory, $window, $route, $routeParams) {
    const vm = this;
    vm.title = "This is one ssssjob";
    const jobId = $routeParams.jobID;
    jobDataFactory.getOneJob(jobId)
        .then(function (response) {
            vm.job = response;
        }).catch(function (err) { console.log(err) });
    vm.deleteJob = function (jobId) {
        jobDataFactory.deleteJob(jobId)
            .then(function (response) {
                console.log("Job  deleted");
                $window.alert("Job   deleted successfully!");
                $window.location.href = "http://localhost:5000/#/jobs/";
            })
    }
    vm.editJobF = function (jobId) {
        const postData = {
            title: vm.newjobTitle,
            salary: vm.newjobSalary,
            description: vm.newjobDescription,
            location: {
                city: vm.newjobCity,
                state: vm.newjobState,
            },
            experience: vm.newjobExperience,
            skills:vm.newjobSkills,
            postDate:vm.newjobDate
        };
        jobDataFactory.fullyUpdateJob(jobId,postData)
            .then(function (response) {
                console.log("Job  edited");
                $window.alert("Job edited successfully!");
                $route.reload();
            })
            .catch(function (error) {
                console.log(error);
            });

    }
}






