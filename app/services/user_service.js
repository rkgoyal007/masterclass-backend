'use strict';

class UserService {
  constructor(log, mongoose, bcrypt, tokenHandler, errs) {
    this.log = log;
    this.mongoose = mongoose;
    this.tokenHandler = tokenHandler
    this.errs = errs;
  }

  async createUser(body) {
    const User = this.mongoose.model('User');
    const {email} = body;
    let user = await User.findOne({email});
    if (!user) {
      user = new User(body);
      user = await user.save();
    }
    let payload = {
      email:email
    }
    var token = this.tokenHandler.generateToken(payload)
    this.log.info('User Created Successfully');
    const data = {
      _id:user._id,
      email: user.email,
      token: token
    }
    return data;
  }

  async getUser(req) {
    const User = this.mongoose.model('User');
    const {authorization} = req.headers
    const payload = await this.tokenHandler.verifyToken(authorization)
    const {email} = payload
    const user = await User.findOne({email});
    if (!user) {
      const err = new this.errs.NotFoundError(
        'Invalid Authorization Token'
      );
      return err;
    }
    this.log.info('User fetched Successfully');
    const data = user
    return data;
  }

  async updateUser(req) {
    const User = this.mongoose.model('User');
    const {authorization} = req.headers
    const payload = await this.tokenHandler.verifyToken(authorization)
    const {email} = payload
    const user = await User.findOne({email});
    if (!user) {
      const err = new this.errs.NotFoundError(
        'Invalid Authorization Token'
      );
      return err;
    }
    const {body} = req
    const updatedUser = await User.findOneAndUpdate({email}, {$set: body}, {new: true})
    this.log.info('User Updated Successfully');
    const data = updatedUser
    return data;
  }
}

module.exports = UserService;