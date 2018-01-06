'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
    url = require('url'),
    VKontakteStrategy = require('passport-vkontakte').Strategy,
    config = require('../config'),
    users = require('../../app/controllers/users.server.controller');

module.exports = function() {
// Use facebook strategy
    passport.use(new VKontakteStrategy({
            clientID: config.vkontakte.clientID,
            clientSecret: config.vkontakte.clientSecret,
            callbackURL: config.vkontakte.callbackURL,
            passReqToCallback: true
        },
        function(req, accessToken, refreshToken, profile, done) {
// Set the provider data and include tokens
            var providerData = profile._json;
            providerData.accessToken = accessToken;
            providerData.refreshToken = refreshToken;

// Create the user OAuth profile
            var providerUserProfile = {
                displayName: profile.displayName,
                username: profile.username,
                provider: 'vkontakte',
                providerIdentifierField: 'id',
                providerData: providerData
            };

// Save the user OAuth profile
            users.saveOAuthUserProfile(req, providerUserProfile, done);
        }
    ));
};
