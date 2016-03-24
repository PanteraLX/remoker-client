'use strict';

/**
 * @ngdoc function
 * @name remoker.controller:ResultCtrl
 * @description
 * # ResultCtrl
 * Controller of remoker
 */
angular.module('remoker')
    .controller('ResultCtrl', function ($scope, $location, $wamp, rpc, user, estimation, story,
                                        room, parameters, schema, onNewStory, onReestimation, onNewDeveloper) {
        if (typeof user.id === 'undefined') {
            $location.path("/");
        }

        // The buttons for "New Story and "Reestimation" are only visible to the master
        $scope.isMaster = user.is_master;

        $scope.estimations = story.estimations;
        $scope.storyPoints = story.result;
        $scope.sizingArray = schema.getArray(room.schema);

        /**
         * Is called when the master is happy with the result of the estimations
         * and wants to create a new story to estimate
         *
         * @return void
         */
        $scope.newStory = function() {
            story = {};
            estimation = {};
            $location.path("/story");
        };

        /**
         * Is called when the master wishes a reestimation of the current story.
         * A call to the backend is send to delete all references to estimations from the story object.
         *
         * @return void
         */
        $scope.reEstimate = function() {
            $wamp.getWampSession().call(rpc.deleteEstimations, parameters.getParameters())
                .then(
                    function(response) {
                        Object.assign(story, JSON.parse(response[0]));
                        $wamp.publish({reestimation: true});
                    },
                    function(exception) {
                        console.log(exception);
                    }
                );
        };
});
