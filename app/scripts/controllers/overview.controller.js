'use strict';

/**
 * @ngdoc function
 * @name remoker.controller:OverviewCtrl
 * @description
 * # OverviewCtrl
 * Controller of remoker
 */
angular.module('remoker')
    .controller('OverviewCtrl', function($scope, $wamp, rpc, user, estimation, story, room, schema, parameters, onResolution) {

        $scope.isMaster = user.is_master;
        $scope.estimations = story.estimations;
        $scope.storyName = story.name;

        $scope.resolveStory = function() {
            $wamp.getWampSession().call(rpc.getStory, parameters.getParameters())
                .then(
                    function(response) {
                        Object.assign(story, JSON.parse(response[0]));
                        console.log(story);
                        story.result = story.getMedian($scope.sizingArray = schema.getArray(room.schema));
                        console.log(story.result);
                        return $wamp.getWampSession().call(rpc.setResult, parameters.getParameters());
                    },
                    function(exception) {
                        $scope.creationErrorMessage = exception.desc;
                        $scope.creationError = true;
                        $scope.$apply();
                    }
                )
                .then(
                    function(response) {
                        Object.assign(story, JSON.parse(response[0]));
                        $wamp.publish({resolution: true});
                    },
                    function(exception) {
                        $scope.creationErrorMessage = exception.desc;
                        $scope.creationError = true;
                        $scope.$apply();
                    }
                )
        };

        $scope.$on('newEstimation', function(event, estimation) {
            $scope.estimations.push(estimation);
            $scope.$apply();
        });
    });
