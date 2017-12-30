'use strict';

module.exports = function(app) {
    var articles = require('../../app/controllers/articles.server.controller');
    var users = require('../../app/controllers/users.server.controller');

    app.route('/articles')
        .get(articles.list)
        .post(users.requiresLogin, articles.create);

    app.route('/articles/:articleId')
        .get(articles.read)
        .put(users.requiresLogin, articles.update)
        .delete(users.requiresLogin, articles.delete);

    // Finish by binding the article middleware
    app.param('articleId', articles.articleByID);
};
