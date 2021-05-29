var a=angular.module("meanjobs",  ["ngRoute"]).config(config);


function config($routeProvider,$locationProvider)  {
   $locationProvider.hashPrefix("");
    $routeProvider.when("/jobs",  {
        templateUrl:  "angular-app/job-list/joblist.html",
        controller:"jobListController",
        controllerAs:  "jobListController"})
        .when("/jobs/:jobID", {
            templateUrl:  "angular-app/job-display/jobDisplay.html",
            controller: "jobDisplayController",
            controllerAs:  "jobDisplayController"});};