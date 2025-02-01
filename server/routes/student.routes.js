const express = require("express");
const router = express.Router();

// Require the Student model in order to interact with the database
const Student = require("../models/Student.model");

//Create new student
router.post("/students", (req, res) => {
	Student.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		phone: req.body.phone,
		linkedinUrl: req.body.linkedinUrl,
		languages: req.body.languages,
		program: req.body.program,
		background: req.body.background,
		image: req.body.image,
		cohort: req.body.cohort,
		projects: req.body.projects,
	})
		.then((createdStudent) => {
			res.status(201).json(createdStudent);
		})
		.catch((error) => {
			console.log("Error while posting ", error);
			res.status(500).json({ error: "Failed to create the student" });
		});
});

//Get all students
router.get("/students", (req, res) => {
	Student.find({})
		.populate("cohort")
		.then((allStudents) => {
			res.status(200).json(allStudents);
		})
		.catch((error) => {
			res
				.status(500)
				.json({ message: "Error while trying to get all students" });
		});
});

// Update existing student
router.put("/students/:studentId", (req, res) => {
	Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true }) // {new:true} updates the response we send to the frontend. without it, the visual part is updated too, but the response is not
		.then((student) => {
			res.status(204).json(student);
		})
		.catch((error) => {
			res.status(500).json({ message: "Error while updating student" });
		});
});

//Delete a student
router.delete("/students/:studentId", (req, res) => {
	Student.findByIdAndDelete(req.params.studentId)
		.then((student) => {
			res.status(204).json(student);
		})
		.catch((error) => {
			res.status(500).json({ message: "Error while deleting a student" });
		});
});

// Get students by cohortId
router.get("/students/cohort/:cohortId", (req, res) => {
    const cohortId = req.params.cohortId;
    Student.find({cohort:cohortId})
    .populate("cohort")
    .then((result) => {  // "result" is the array of results that is returned by the find method (promise). every ditto we put inside the () of the then is automatically the result of find.
      console.log("request -> ", req)
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log("error -> ", error)
      res.status(500).json({message: "Error while trying to get student by cohort"});
    });
  
  })
  
  // Get student by studentId
  router.get("/students/:studentId", (req, res) => {
    Student.findById(req.params.studentId)
    .populate("cohort")
    .then((student) => {
      res.status(200).json(student)
    })
    .catch((error) => {
      res.status(500).json({message: "Error getting one student"})
    })
  })

module.exports = router;
