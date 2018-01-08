'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
    function ($resource) {
        return $resource('users', {}, {
            update: {
                method: 'PUT'
            }
        });
    }
])
    .factory('UsersAdmin', ['$resource',
        function ($resource) {
            return $resource('admin/:userId', {
                userId: '@_id'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }
    ]);

