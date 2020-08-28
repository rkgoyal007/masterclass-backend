'use strict'

class TokenHandler {
  constructor (jwt, secret) {
    this.jwt = jwt
    this.secret = secret
    this.expiryTime = 9998640
  }

  generateToken (payload) {
    return this.jwt.sign(payload,
      this.secret, {
        expiresIn: this.expiryTime
      })
  }

  verifyToken (token) {
    var decoded = this.jwt.verify(token, this.secret)
    if (!decoded) {
      return undefined
    }
    return decoded
  }
}

module.exports = TokenHandler
