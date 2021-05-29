angular.module("meanjobs").controller("jobListController", jobListController);
function jobListController(jobDataFactory, $window, $route) {
    const vm = this;
    vm.number = 0;
    vm.title = "YOOO this is a list of job";
    jobDataFactory.getAlljobs(vm.number)
        .then(function (response) {
            vm.jobs = response;
        })
    console.log("*/*-/*/*/-*/-*");


    console.log("*/*-/*/*/-*/-*");
    vm.addJobF = function () {

        const postData = {
            title: vm.jobTitle,
            salary: vm.jobSalary,
            description: vm.jobDescription,
            location: {
                city: vm.jobCity,
                state: vm.jobState,
            },

            experience: vm.jobExperience,
            skills: vm.jobSkills,
            postDate: vm.jobDate
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
    vm.nextPage = function () {
        console.log("*//-**-/-*/-*/");
        console.log(vm.jobs.length);
        console.log("*//-**-/-*/-*/");
        if ((vm.jobs.length) == 5) {

            vm.number = vm.number + 5;
            jobDataFactory.getAlljobs(vm.number)
                .then(function (response) {
                    vm.jobs = response;
                })
        }
    }
    vm.previousPage = function () {
        console.log("*//-**-/-*/-*/");
        console.log(vm.jobs.length);
        console.log("*//-**-/-*/-*/");
        if (vm.number >= 5) vm.number = vm.number - 5;
        jobDataFactory.getAlljobs(vm.number)
            .then(function (response) {
                vm.jobs = response;
            })
    }


    console.log(vm.jobs);
}