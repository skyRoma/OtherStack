'use strict';

// Userscontroller
angular.module('users').controller('UsersController', ['$scope', '$sce', '$stateParams', '$location', 'Authentication', 'UsersAdmin',
    function ($scope, $sce, $stateParams, $location, Authentication, UsersAdmin) {
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.offset = 0;

        $scope.makeAdmin = function () {
            $scope.success = $scope.error = null;
            var user = new UsersAdmin($scope.user);
            user.role = "admin";
            user.$update(function (response) {
                $scope.success = true;
                Authentication.user = response;
            }, function (response) {
                $scope.error = response.data.message;
            });

        };


        // Remove existing User
        $scope.remove = function (user) {
            var user = this.user;
            if (user) {
                user.$remove();
                $location.path('/admin');
                for (var i in $scope.users) {
                    if ($scope.users[i] === user) {
                        $scope.users.splice(i, 1);
                    }
                }
            } else {
                $scope.user.$remove(function () {
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

        $scope.updateUserProfile = function (isValid) {
            if (isValid) {
                $scope.success = $scope.error = null;
                var user = $scope.user;
                user.$update(function (response) {
                    $scope.success = true;
                    // Authentication.user = response;
                }, function (response) {
                    $scope.error = response.data.message;
                });
            } else {
                $scope.submitted = true;
            }
        };
    }
]);
