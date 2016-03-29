'use strict';

/**
 * @ngdoc function
 * @name remoker.controller:OverviewCtrl
 * @description
 * # OverviewCtrl
 * Controller of remoker
 */
angular.module('remoker')
    .controller('OverviewCtrl', function($scope, $wamp, $location, rpc, user, estimation, story, room, schema,
                                         parameters, median, onResolution, onHasEstimation) {
        if (typeof user.id === 'undefined') {
            $location.path("/");
        }

        // The button for "resolve Story" is only visible to the master
        $scope.isMaster = user.is_master;

        // Assignment
        $scope.estimations = story.estimations;
        $scope.developers = room.developers;
        $scope.storyName = story.name;
        $scope.hasEstimation = story.hasEstimation;
        $scope.sizingArray = schema.getArray(room.schema);

        /**
         * Fills an array with all the developers, which have published their estimation object
         *
         * @return void
         * @param estimation
         */
        var fillHasEstimation = function (estimation) {
            var id = estimation.developer.id,
                developer = $scope.developers.filter(
                    function (e) {
                        return e.id === id;
                    }
                );
            $scope.hasEstimation[developer[0].id] = true;
            $wamp.publish({hasEstimation: $scope.hasEstimation});
        };

        /**
         * Listens on Angular broadcast messages, fired by a published, freshly created estimation object.
         *
         * @return void
         */
        $scope.$on('newEstimation', function (event, estimation) {
            fillHasEstimation(estimation);
            $scope.estimations.push(estimation);
            $scope.$apply();
        });

        /**
         * Is called when the master wants to see the result of the estimation
         *
         * Since all newly created estimations are send via a publish message,
         * a 'fresh' story object should be loaded from the backend with all (validated) estimations in it.
         * The main reason for this step is to guarantee that no published estimation got lost
         *
         * The second step is the calculation of the median result of all estimations.
         * This result is send to the backend
         *
         * @return void
         */
        $scope.resolveStory = function () {
            $wamp.getWampSession().call(rpc.getStory, parameters.getParameters())
                .then(
                    function (response) {
                        Object.assign(story, JSON.parse(response[0]));
                        story.result = median.calculate($scope.estimations);
                        return $wamp.getWampSession().call(rpc.setResult, parameters.getParameters());
                    },
                    function (exception) {
                        $scope.creationErrorMessage = exception.desc;
                        $scope.creationError = true;
                        $scope.$apply();
                    }
                )
                .then(
                    function (response) {
                        Object.assign(story, JSON.parse(response[0]));
                        $wamp.publish({resolution: true});
                    },
                    function (exception) {
                        $scope.creationErrorMessage = exception.desc;
                        $scope.creationError = true;
                        $scope.$apply();
                    }
                );
        };
    });
