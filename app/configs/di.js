'use strict';

const serviceLocator = require('../lib/service_locator');
const config = require('./configs')();

serviceLocator.register('bcrypt', () => {
  return require('bcryptjs')
})

serviceLocator.register('jwt', () => {
  return require('jsonwebtoken')
})

serviceLocator.register('logger', () => {
  return require('../lib/logger').create(config.application_logging);
});

serviceLocator.register('httpStatus', () => {
  return require('http-status');
});

serviceLocator.register('mongoose', () => {
  return require('mongoose');
});

serviceLocator.register('fs', () => {
  return require('file-system');
});

serviceLocator.register('mv', () => {
  return require('mv');
});

serviceLocator.register('util', () => {
  return require('util');
});

serviceLocator.register('errs', () => {
  return require('restify-errors');
});

serviceLocator.register('request', () => {
  return require('request');
});

serviceLocator.register('form-data', () => {
  return require('form-data');
});

serviceLocator.register('extract-frames', () => {
  const extractFrames = require('ffmpeg-extract-frames');
  return extractFrames;
});

serviceLocator.register('cmd', () => {
  return require('node-cmd');
});

serviceLocator.register('bluebird', () => {
  return require('bluebird');
});

serviceLocator.register('constant', () => {
  return require('../constants/constant');
});

serviceLocator.register('tokenHandler', serviceLocator => {
  const jwt = serviceLocator.get('jwt')
  const TokenHandler = require('../lib/token_handler')

  return new TokenHandler(jwt, config.jwt.secret)
});

//User sign-up login and update
serviceLocator.register('userController', (serviceLocator) => {
  const log = serviceLocator.get('logger');
  const httpStatus = serviceLocator.get('httpStatus');
  const userService = serviceLocator.get('userService');
  const UserController = require('../controllers/user_controller');

  return new UserController(log, userService, httpStatus);
});

serviceLocator.register('userService', (serviceLocator) => {
  const log = serviceLocator.get('logger');
  const mongoose = serviceLocator.get('mongoose');
  const bcrypt = serviceLocator.get('bcrypt')
  const tokenHandler = serviceLocator.get('tokenHandler')
  const errs = serviceLocator.get('errs');
  const UserService = require('../services/user_service');

  return new UserService(log, mongoose, bcrypt, tokenHandler, errs);
});

module.exports = serviceLocator;