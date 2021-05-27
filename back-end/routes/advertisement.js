const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const config = require('config');
const Advertisement = require('../model/Advertisement');

/**
 * @router GET api/advertisement
 * @description Get all advertisement data
 * @access guest
 */
router.get('/', async (req,res) => {
	try{
		const advertisements = await Advertisement.find({post:  req.params.post}).sort({date: -1});
		const channelName = ["facebook", "google", "instagram", "youtube"];
		const views = [];
		const spentInUsd = [];
		advertisements.forEach(el => {
			views[channelName.indexOf(el.channelName)] = (views[channelName.indexOf(el.channelName)] ? views[channelName.indexOf(el.channelName)]  : 0 ) + parseInt(el.views);
			spentInUsd[channelName.indexOf(el.channelName)] = (spentInUsd[channelName.indexOf(el.channelName)] ? spentInUsd[channelName.indexOf(el.channelName)]  : 0 ) + parseInt(el.spentInUsd);
		});	
		return res.json({views, spentInUsd, channelName});
	}catch(err){
		return res.status(500).json({msg: err.message});
	}
});

router.post('/',  async (req,res) => {
	const {channelName, views, spentInUsd} = req.body;
	try{
		const newAdvertisement = new Advertisement({
			channelName, views, spentInUsd
		});
		const advertisement = await newAdvertisement.save();
		return  res.json(req.body);
	}catch(err){
		return res.status(500).json({msg: err.message});
	}
});


module.exports = router;