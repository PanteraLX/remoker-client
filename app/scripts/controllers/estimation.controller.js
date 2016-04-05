'use strict';

/**
 * @ngdoc function
 * @name remoker.controller:EstimationCtrl
 * @description
 * # EstimationCtrl
 * Controller of remoker
 */
angular.module('remoker')
    .controller('EstimationCtrl', function($scope, $wamp, $location, rpc, schema, user, room, story,
                                           estimation, parameters, onResolution, onNewDeveloper, onHasEstimation) {
        if (typeof user.id === 'undefined') {
            $location.path("/");
        }

        // Loads all possible schema cardsets
        $scope.cardSet = schema.getArray(room.schema);

        $scope.estimation = {};
        $scope.storyName = story.name;

        /**
         * Since there are two promises to fulfill,
         * the presentation of a rejected promise and the corresponding exception is extracted to this separate method.
         *
         * @param exception
         * @return void
         */
        var showException = function (exception) {
            $scope.creationErrorMessage = exception.desc;
            $scope.creationError = true;
            $scope.$apply();
            console.log(exception);
        };

        /**
         * Is called when the developer selects one of the given estimation values in the
         *
         * @param value
         * @return void
         */
        $scope.setEstimationValue = function (value) {
            $scope.value = value;
        };

        /**
         * Calls the createEstimationAction in the backend server to create a new Estimation object
         * with the selected estimation value.
         *
         * On fulfilled promise, the estimation will be published and the story object with all the estimation
         * of the other developers will be loaded
         *
         * @return void
         */
        $scope.createEstimation = function () {
            estimation.value = $scope.value;
            $wamp.getWampSession().call(rpc.createEstimation, parameters.getParameters())
                .then(
                    function (response) {
                        Object.assign(estimation, JSON.parse(response[0]));
                        $wamp.publish({estimation: estimation});
                        return $wamp.getWampSession().call(rpc.getStory, parameters.getParameters());
                    },
                    function (exception) {
                        showException(exception);
                    }
                )
                .then(
                    function (response) {
                        Object.assign(story, JSON.parse(response[0]));
                        $location.path('/overview');
                        $scope.$apply();
                    },
                    function (exception) {
                        showException(exception);
                    }
                );
        };

        angular.element('create-estimation-heading').textfill();
    });
