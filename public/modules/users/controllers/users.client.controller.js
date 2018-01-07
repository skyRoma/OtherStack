'use strict';

// Userscontroller
angular.module('users').controller('UsersController', ['$scope', '$sce', '$stateParams', '$location', 'Authentication', 'UsersAdmin',
    function ($scope, $sce, $stateParams, $location, Authentication, UsersAdmin) {
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.offset = 0;

        // Remove existing User
        $scope.remove = function(user) {
            var user=this.user;
            if ( user ) {
                user.$remove();
                $location.path('/admin');
                for (var i in $scope.users) {
                    if ($scope.users[i] === user) {
                        $scope.users.splice(i, 1);
                    }
                }
            } else {
                $scope.user.$remove(function() {
                    $location.path('/admin');
                });
            }
        };


        // Find a list of Users
        $scope.find = function () {
            $scope.users = UsersAdmin.query();
        };

        $scope.findOne = function () {
            $scope.user = UsersAdmin.get({
                userId: $stateParams.userId
            });
        };

    }
]);
