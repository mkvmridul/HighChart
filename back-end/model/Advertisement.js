const mongoose = require('mongoose');

const AdvertisementSchema = mongoose.Schema({
	channelName:{
		type: String,
		required: true
	},
	views:{
		type: String,
		required: true,
	},
	spentInUsd:{
		type: String,
		required: true
	},
	date:{
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('advertisement',AdvertisementSchema);