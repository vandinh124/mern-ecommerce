const UserController = require('../controllers/user.controller');

module.exports = function (app){
    app.post('/api/users', UserController.register);
    app.post('/api/users/login', UserController.login);
    app.delete('/api/users/logout', UserController.logout);
}