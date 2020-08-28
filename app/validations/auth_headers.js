'use strict'

const joi = require('joi')

module.exports = joi.object({
  authorization: joi.string().required()
})