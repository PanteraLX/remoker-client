'use strict';

/**
 * @ngdoc function
 * @name remoker.controller:StoryCtrl
 * @description
 * # StoryCtrl
 * Controller of remoker
 */
angular.module('remoker')
    .controller('StoryCtrl', function ($scope, $cookies, $wamp, $location, room, story, rpc, parameters) {

        /**
         * Calls the createStoryAction in the backend server.
         */
        $scope.createStory = function() {
            story.name = $scope.storyName;
            $wamp.getWampSession().call(rpc.createStory, parameters.getParameters())
                .then(
                    function(response) {
                        Object.assign(story, JSON.parse(response[0]));
                        $wamp.publish({story: story});
                        $location.path('/overview');
                        $scope.$apply();
                    },
                    function(exception) {
                        $scope.creationErrorMessage = exception.desc;
                        $scope.creationError = true;
                        $scope.$apply();
                        console.log(exception);
                    }
                );

        };
});
