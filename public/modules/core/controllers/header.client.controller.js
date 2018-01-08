'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$rootScope', 'Authentication', 'Menus',
    function ($scope, $rootScope, Authentication, Menus) {
        $scope.authentication = Authentication;
        $scope.isCollapsed = false;
        $scope.menu = Menus.getMenu('topbar');
        $rootScope.language = "En"

        // Collapsing the menu after navigation
        $scope.$on('$stateChangeSuccess', function () {
            $scope.isCollapsed = false;
        });

        $scope.langEn = function () {
            $rootScope.language = "En"
        }
        $scope.langRu = function () {
            $rootScope.language = "Ru"
        }
    }
]);
