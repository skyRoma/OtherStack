'use strict';

//Articlesservice used to communicate ArticlesREST endpoints
angular.module('articles').factory('Articles', ['$resource',
    function ($resource) {
        return $resource('articles/:articleId', {
            articleId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
