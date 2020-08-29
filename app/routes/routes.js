'use strict';


///////////////////////////////
/////// User ///////
///////////////////////////////

module.exports.user = (server, serviceLocator) => {
    server.post(
        {
          path: '/user',
          name: 'Create User',
          version: '1.0.0',
          validation: {
            body: require('../validations/user/create_user')
          }
        },
        (req, res, next) =>
          serviceLocator.get('userController').create(req, res, next)
      )
    
      server.get(
        {
          path: '/user',
          name: 'Get User',
          version: '1.0.0',
          validation: {
            headers: require('../validations/auth_headers')
          }
        },
        (req, res, next) =>
          serviceLocator.get('userController').get(req, res, next)
      )
    
      server.put(
        {
          path: '/user',
          name: 'Update User',
          version: '1.0.0',
          validation: {
            headers: require('../validations/auth_headers'),
            body: require('../validations/user/update_user')
          }
        },
        (req, res, next) =>
          serviceLocator.get('userController').update(req, res, next)
      )
        
}
