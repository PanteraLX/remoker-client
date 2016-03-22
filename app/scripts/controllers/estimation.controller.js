'use strict';

/**
 * @ngdoc function
 * @name remoker.controller:EstimationCtrl
 * @description
 * # EstimationCtrl
 * Controller of remoker
 */
angular.module('remoker')
    .controller('EstimationCtrl', function($scope, $wamp, $location, rpc, schema, user, room, story, estimation, parameters, onResolution) {

        $scope.cardSet = schema.getCardset(room.schema);
        $scope.estimation = {};

        var showException = function(exception) {
            $scope.creationErrorMessage = exception.desc;
            $scope.creationError = true;
            $scope.$apply();
            console.log(exception);
        };

        /**
         * Calls the createEstimationAction in the backend server.
         */
        $scope.createEstimation = function() {
            estimation.value = $scope.estimation.value;
            $wamp.getWampSession().call(rpc.createEstimation, parameters.getParameters())
                .then(
                    function(response) {
                        Object.assign(estimation, JSON.parse(response[0]));
                        $wamp.publish({estimation: estimation});
                        return $wamp.getWampSession().call(rpc.getStory, parameters.getParameters());
                    },
                    function(exception) {
                        console.log(exception);
                        showException(exception);
                    }
                )
                .then(
                    function(response) {
                        Object.assign(story, JSON.parse(response[0]));
                        $location.path('/overview');
                        $scope.$apply();
                    },
                    function(exception) {
                        showException(exception);
                    }
                );
        };
    });
