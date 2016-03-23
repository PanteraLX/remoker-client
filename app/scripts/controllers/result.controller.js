'use strict';

/**
 * @ngdoc function
 * @name remoker.controller:ResultCtrl
 * @description
 * # ResultCtrl
 * Controller of remoker
 */
angular.module('remoker')
    .controller('ResultCtrl', function ($scope, $location, $wamp, rpc, user, estimation, story, room, parameters, schema, onNewStory, onReestimation, onNewDeveloper) {

        $scope.isMaster = user.is_master;
        $scope.estimations = story.estimations;

        $scope.storyPoints = story.result;
        $scope.sizingArray = schema.getArray(room.schema);

        $scope.newStory = function() {
            story = {};
            estimation = {};
            $location.path("/story");
        };

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
