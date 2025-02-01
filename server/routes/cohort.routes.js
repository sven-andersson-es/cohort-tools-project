const express = require("express");
const router = express.Router();

// Require the Cohort model in order to interact with the database
const Cohort = require("../models/Cohort.model");

//Create new cohort
router.post("/cohorts", (req, res) => {
	Cohort.create({
		cohortSlug: req.body.cohortSlug,
		cohortName: req.body.cohortName,
		program: req.body.program,
		format: req.body.format,
		campus: req.body.campus,
		startDate: req.body.startDate,
		endDate: req.body.endDate,
		inProgress: req.body.inProgress,
		programManager: req.body.programManager,
		leadTeacher: req.body.leadTeacher,
		totalHours: req.body.totalHours,
	})
		.then((createdCohort) => {
			res.status(201).json(createdCohort);
		})
		.catch((error) => {
			console.log("Error creating a new cohort", error);
			res.status(500).json({ error: "failed creating a new cohort" });
		});
});

//Get all cohorts
router.get("/cohorts", (req, res) => {
	Cohort.find(req.query)
		.then((allCohorts) => {
			res.status(200).json(allCohorts);
		})
		.catch((error) => {
			res
				.status(500)
				.json({ message: "Error while trying to get all cohorts" });
		});
});
//Find cohort by cohortId
router.get("/cohorts/:cohortId", (req, res) => {
	Cohort.findById(req.params.cohortId)
		.then((cohort) => {
			res.status(200).json(cohort);
		})
		.catch((error) => {
			res.status(500).json({ message: "Error while getting the cohort" });
		});
});
//Find cohort by cohortId and update
router.put("/cohorts/:cohortId", (req, res) => {
	Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
		.then((cohort) => {
			res.status(204).json(cohort);
		})
		.catch((error) => {
			res.status(500).json({ message: "Error while updating a cohort" });
		});
});
//Find cohort by cohortId and update
router.delete("/cohorts/:cohortId", (req, res) => {
	Cohort.findByIdAndDelete(req.params.cohortId)
		.then((cohort) => {
			res.status(204).json(cohort);
		})
		.catch((error) => {
			res.status(500).json({ message: "Error while trying to delete cohort" });
		});
});

module.exports = router;