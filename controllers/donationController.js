/*
 * Created on Fri Sep 25 2020
 * Copyright (c) 2020 Mark Ambrocio
 * CC BY-NC-SA 4.0
 */

const Dono = require('../models/donate-model');
const Proj = require('../models/project_model');

// custom async/await functions
const addDonation = async (req, res) => {
  // check to see if project exists
  const project = await Proj.findById(req.body.projectID);
  if (!project) {
    return res.status(200).json({
      message: 'No project found, try again later.',
    });
  }
  const newDono = { ...req.body, userID: req.token.userID };
  await Dono.insert(newDono);

  res.status(201).json({ message: 'Successful donation, thank you!' });
};
const findByProjectID = async (req, res) => {
  // check to see if project exists
  const project = await Proj.findById(req.params.projectID);
  if (!project) {
    return res.status(200).json({
      message: 'No project found, try again later.',
    });
  }
  // check to see if project has donations
  const donationList = await Dono.findByProjectID(req.params.projectID);
  if (!donationList || donationList.length === 0) {
    return res.status(200).json({
      message: 'Nothing yet, consider pitching in.',
    });
  }

  res.status(200).json(donationList);
};
const findByUserID = async (req, res) => {
  const donationList = await Dono.findByUserID(req.params.userID);
  if (!donationList || donationList.length === 0) {
    return res.status(200).json({
      message: 'Nothing yet, consider pitching in.',
    });
  }

  res.status(200).json(donationList);
};

const findByID = async (req, res) => {
  const dono = await Dono.findById(req.params.id);

  res.status(200).json(dono);
};

module.exports = {
  addDonation,
  findByProjectID,
  findByUserID,
  findByID,
};
