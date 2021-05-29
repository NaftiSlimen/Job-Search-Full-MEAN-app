const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const locationController = require("../controllers/locationController");

//job route
router.route("/api/job")
    .get(jobController.showAll)
    .post(jobController.addJob);
router.route("/api/job/:jobID")
    .delete(jobController.removeJob)
    .get(jobController.showJob)
    .put(jobController.fullyUpdateJob)
    .patch(jobController.partiallyUpdateJob);
//location route
router.route("/api/job/:jobID/location")
    .get(locationController.showLocation)
    .post(locationController.addLocation)
    .delete(locationController.deleteLocation)
    .patch(locationController.partiallyUpdateLocation)
    .put(locationController.fullyUpdateLocation);

module.exports = router;