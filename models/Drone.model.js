// Iteration #1
const { model, Schema } = require("mongoose");

const droneSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	propellers: Number,
    maxSpeed: Number
});

const Drone = model("Drone", droneSchema);

module.exports = Drone;
