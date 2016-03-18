'use strict';

/**
 * @ngdoc function
 * @name remoker.controller:EstimationCtrl
 * @description
 * # EstimationCtrl
 * Controller of remoker
 */
angular.module('remoker')
    .controller('EstimationCtrl', function($scope, $wamp, rpc, schema, user, room, story, estimation) {

        $scope.cardSet = schema.getCardset(room.schema);

        $scope.estimation = {};

        var getParameters = function() {
            var parameters = {};
            parameters.estimation = estimation;
            parameters.user = user;
            parameters.story = story;
            parameters.room = room;
            return JSON.stringify(parameters);
        };

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
            $wamp.getWampSession().call(rpc.createEstimation, getParameters())
                .then(
                    function(response) {
                        Object.assign(estimation, JSON.parse(response[0]));
                        return $wamp.getWampSession().call(rpc.getStory, getParameters())
                    },
                    function(exception) {
                        showException(exception)
                    }
                )
                .then(
                    function(response) {
                        Object.assign(story, JSON.parse(response[0]));
                        $location.path('/overview');
                        $scope.$apply()
                    },
                    function(exception) {
                        showException(exception)
                    }
                );
        };
    });
