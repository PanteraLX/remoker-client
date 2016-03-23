'use strict';

/**
 * @ngdoc function
 * @name remoker.controller:OverviewCtrl
 * @description
 * # OverviewCtrl
 * Controller of remoker
 */
angular.module('remoker')
    .controller('OverviewCtrl', function($scope, $wamp, rpc, user, estimation, story, room, schema, parameters, onResolution, onHasEstimation) {

        $scope.isMaster = user.is_master;
        $scope.estimations = story.estimations;
        $scope.developers = room.developers;
        $scope.storyName = story.name;
        console.log(story.hasEstimation);

        $scope.hasEstimation = story.hasEstimation;

        $scope.resolveStory = function() {
            $wamp.getWampSession().call(rpc.getStory, parameters.getParameters())
                .then(
                    function(response) {
                        Object.assign(story, JSON.parse(response[0]));
                        story.result = story.getMedian($scope.sizingArray = schema.getArray(room.schema));
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
            var short_id = estimation.developer.short_id;
            var result = $scope.developers.filter(
                function(e){
                    return e.short_id === short_id;
                }
            );
            $scope.hasEstimation[result[0].short_id] = true;
            $wamp.publish({hasEstimation: $scope.hasEstimation});
            $scope.estimations.push(estimation);
            $scope.$apply();
        });
    });
