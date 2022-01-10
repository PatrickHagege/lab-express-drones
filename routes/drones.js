const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// require the Drone model here
const Drones = require("../models/Drone.model");


router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  Drones.find()
		.then((dbResponse) => {
			// console.log("Database response:", dbResponse);
			res.render("drones/list.hbs", {
				drones: dbResponse
			});
		})
		.catch((e) => console.error(e));
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render('drones/create-form.hbs', {
  });
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  //console.log("req body", req.body);

	Drones.create(req.body)
		.then((newDrone) => {
			//console.log("Newdrone: ", newDrone);
			res.redirect("/drones");
		})
		.catch((e) => next(e));
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  //console.log(req.params)
  Drones.findById(req.params.id)
  .then((currentDrone) => {
    //console.log(currentDrone)
    res.render('drones/update-form.hbs', {
      currentDrone
    })
  })
  .catch((error) => next(error))
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // console.log('req.params', req.params)
  // console.log('req.body', req.body)
  Drones.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      propellers:req.body.propellers,
      maxSpeed:req.body.maxSpeed
    })
  .then(
    res.redirect('/drones')
  )
  .catch((error) => {
    next(error);
  })
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // console.log(req.params.id) /* action attribute sits in req params not req.body */
  Drones.findByIdAndDelete(req.params.id)
    .then(()=>{
      console.log('deleted')
      res.redirect('/drones')
    })
    .catch((error) => {
      next(error)
    })
});

module.exports = router;
