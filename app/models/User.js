'use strict'

const serviceLocator = require('../lib/service_locator')
const mongoose = serviceLocator.get('mongoose')

const userSchema = new mongoose.Schema({
email: {
    type: String,
    trim: true,
    required: true,
    unique: true
    },
displayName: {
    type: String,
    trim: true
  },
photoUrl: {
    type: String,
  },
gender: {
    type: String,
    trim: true
  },
mobileNumber: {
    type: String,
    trim: true,
  },
isMobileVerified: {
    type: Boolean,
    default: false,
    trim: true
  },
birthdate: {
      type: Date,
  }
},
{
  timestamps: true
}
)

module.exports = mongoose.model('User', userSchema)
