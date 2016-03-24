'use strict';

/**
 * @ngdoc function
 * @name remoker.controller:StoryCtrl
 * @description
 * # StoryCtrl
 * Controller of remoker
 */
angular.module('remoker')
    .controller('StoryCtrl', function ($scope, $wamp, $location, user,
                                       story, rpc, parameters, onNewDeveloper) {
        if (typeof user.id === 'undefined') {
            $location.path("/");
        }

        /**
         * Calls the createStoryAction in the backend server and notifies all developers subscribed to the remoker topic
         *
         * @return void
         */
        $scope.createStory = function () {
            story.name = $scope.storyName;
            $wamp.getWampSession().call(rpc.createStory, parameters.getParameters())
                .then(
                    function (response) {
                        Object.assign(story, JSON.parse(response[0]));

                        // All developers subscribed to the remoker channel should be notified
                        $wamp.publish({story: story});

                        $location.path('/overview');
                        story.hasEstimation = {};
                        $scope.$apply();
                    },
                    function (exception) {
                        $scope.creationErrorMessage = exception.desc;
                        $scope.creationError = true;
                        $scope.$apply();
                        console.log(exception);
                    }
                );

        };
    });
