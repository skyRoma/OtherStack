'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function (app) {
    // User Routes
    var users = require('../../app/controllers/users.server.controller');
    // Setting up the users profile api
    app.route('/users/me').get(users.me);
    app.route('/users').put(users.update);
    app.route('/users/accounts').delete(users.removeOAuthProvider);

    // Setting up the users password api
    app.route('/users/password').post(users.changePassword);
    app.route('/auth/forgot').post(users.forgot);
    app.route('/auth/reset/:token').get(users.validateResetToken);
    app.route('/auth/reset/:token').post(users.reset);

    // Setting up the users authentication api
    app.route('/auth/signup').post(users.signup);
    app.route('/auth/signin').post(users.signin);
    app.route('/auth/signout').get(users.signout);

    // Setting the facebook oauth routes
    app.route('/auth/facebook').get(passport.authenticate('facebook', {
        scope: ['email']
    }));
    app.route('/auth/facebook/callback').get(users.oauthCallback('facebook'));

    // Setting the twitter oauth routes
    app.route('/auth/twitter').get(passport.authenticate('twitter'));
    app.route('/auth/twitter/callback').get(users.oauthCallback('twitter'));

    // Setting the vkontakte oauth routes
    app.route('/auth/vkontakte').get(passport.authenticate('vkontakte'));
    app.route('/auth/vkontakte/callback').get(users.oauthCallback('vkontakte'));

    app.route('/admin')
        .get(users.list)


    app.route('/admin/:userId')
        .get(users.read)
        .put(users.update)
        .delete(users.delete);


    // Finish by binding the user middleware
    app.param('userId', users.userByID);
};
