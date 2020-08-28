'use strict'

const joi = require('joi')

module.exports = joi.object({
    gender : joi.string().valid('Male','Female','Other'),
    birthdate : joi.date()
})