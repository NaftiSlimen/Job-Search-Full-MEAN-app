angular.module("meanjobs").controller("jobListController", jobListController);
function jobListController(jobDataFactory,$window,$route) {
    const vm = this;
    vm.title = "YOOO this is a list of job";
    jobDataFactory.getAlljobs()
        .then(function (response) {
            vm.jobs = response;
        })
    console.log("*/*-/*/*/-*/-*");

    
    console.log("*/*-/*/*/-*/-*");
    vm.addJobF=function(){
        
        const postData = {
            title: vm.jobTitle,
            salary: vm.jobSalary,
            description: vm.jobDescription,
            location: {
                city: vm.jobCity,
                state: vm.jobState,
            },

            experience: vm.jobExperience,
            skills:vm.jobSkills,
            postDate:vm.jobDate
        };
        
        jobDataFactory.addJob(postData)
            .then(function (response) {
                console.log("Job  added");
                $window.alert("Job  added successfully!");
                $route.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    console.log(vm.jobs);
}