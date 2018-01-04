'use strict';

// Articlescontroller
angular.module('articles').controller('ArticlesController', ['$scope', '$sce', '$stateParams', '$location', 'Authentication', 'Articles',
    function ($scope, $sce, $stateParams, $location, Authentication, Articles) {
        $scope.user = Authentication.user;
        $scope.authentication = Authentication;
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.offset = 0;

        $scope.AddVideo = function () {
            if ($scope.videoLink) {
                var r,
                    rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
                r = $scope.videoLink.match(rx);
                var validLink = "https://www.youtube.com/embed/" + r[1] + "?autoplay=0";
                var video = document.getElementById("frame");
                video.src = validLink;
                return validLink;

            }
            else return null;
        }


        $scope.EditVideo = function () {
            $scope.article.validLink=this.AddVideo();
        }



//input exist video
        $scope.readVideoLink = function () {
            setTimeout(function () {
                $scope.$apply(function () {
                    var vid = document.getElementById("frame");
                    vid.src = $scope.article.validLink;
                    $scope.videoLink=$scope.article.validLink;
                });
            }, 100);
        };


        // Page changed handler
        $scope.pageChanged = function () {
            $scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
        };

        // Create new Article
        $scope.create = function () {
            // Create new Article object
            var article = new Articles({
                name: this.name,
                description: this.description,
                user: Authentication.user,
                validLink: this.AddVideo()
            });

            // Redirect after save
            article.$save(function (response) {
                $location.path('articles/' + response._id);

                // Clear form fields
                $scope.name = '';
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Article
        $scope.remove = function (article) {
            if (article) {
                article.$remove();

                for (var i in $scope.articles) {
                    if ($scope.articles [i] === article) {
                        $scope.articles.splice(i, 1);
                    }
                }
            } else {
                $scope.article.$remove(function () {
                    $location.path('articles');
                });
            }
        };

        // Update existing Article
        $scope.update = function () {
            var article = $scope.article;

            article.$update(function () {
                $location.path('articles/' + article._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Articles
        $scope.find = function () {
            $scope.articles = Articles.query();
        };

        // Find existing Article
        $scope.findOne = function () {
            $scope.article = Articles.get({
                articleId: $stateParams.articleId
            });
        };

        // Search for a article
        $scope.articleSearch = function (product) {
            $location.path('articles/' + product._id);
        };
    }
]);
