/*
 * Created on Fri Sep 25 2020
 * Copyright (c) 2020 Mark Ambrocio
 * CC BY-NC-SA 4.0
 */

const Proj = require('../models/project_model');

exports.fetchAll = async (req, res, next) => {
  const projects = await Proj.fetchAll();
  if (!projects || projects.length === 0) {
    return res.status(404).json({
      message: 'Projects not found, try again later.',
    });
  }
  return res.status(200).json(projects);
};

exports.fetchByUserID = async (req, res, next) => {
  const projects = await Proj.fetchByUserID(req.params.userID);
  if (!projects || projects.length === 0) {
    return res.status(404).json({
      message: 'Projects not found, try again later.',
    });
  }
  res.status(200).json(projects);
};

exports.fetchByID = async (req, res, next) => {
  const project = await Proj.findById(req.params.projectID);
  // console.log(project);
  if (!project) {
    return res.status(404).json({
      message: 'Project not found, try again later.',
    });
  }

  return res.status(200).json(project);
};

exports.createProject = async (req, res, next) => {
  const { userID } = req.token;
  const sentProject = req.body;
  const project = await Proj.insert({ ...sentProject, userID });
  if (!project) {
    return res.status(404).json({
      message: 'Could not create project, try again later.',
    });
  }
  return res.status(201).json(project);
};

exports.editProject = async (req, res, next) => {
  const project = await Proj.update(req.body, req.params.projectID);
  if (!project) {
    return res.status(404).json({
      message: 'Could not edit project, try again later.',
    });
  }
  res.status(200).json(project);
};

exports.deleteProject = async (req, res, next) => {
  const project = await Proj.remove(req.params.projectID);
  if (!project || project === 0) {
    return res.status(404).json({
      message: 'Could not delete, try again later',
    });
  }
  return res.status(200).json({ message: 'Project deleted' });
};
