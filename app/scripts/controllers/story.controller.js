'use strict';

/**
 * @ngdoc function
 * @name remoker.controller:StoryCtrl
 * @description
 * # StoryCtrl
 * Controller of remoker
 */
angular.module('remoker')
    .controller('StoryCtrl', function ($scope, $cookies, $wamp, $location, room, story, rpc) {

        /**
         * Fetches all the necessary parameters for the RP-call
         */
        var getParameters = function() {
            var parameters = {};
            parameters.room = room;
            parameters.story = story;
            return JSON.stringify(parameters);
        };

        /**
         * Calls the createStoryAction in the backend server.
         */
        $scope.createStory = function() {
            story.name = $scope.storyName;
            $wamp.getWampSession().call(rpc.createStory, getParameters())
                .then(
                    function(response) {
                        Object.assign(story, JSON.parse(response[0]));
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
