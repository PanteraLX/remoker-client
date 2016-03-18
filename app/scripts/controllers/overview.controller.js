'use strict';

/**
 * @ngdoc function
 * @name remoker.controller:OverviewCtrl
 * @description
 * # OverviewCtrl
 * Controller of remoker
 */
angular.module('remoker')
    .controller('OverviewCtrl', function($scope, $wamp, rpc, user, estimation, story, room) {

        var getParameters = function() {
            var parameters = {};
            parameters.estimation = estimation;
            parameters.user = user;
            parameters.story = story;
            parameters.room = room;
            return JSON.stringify(parameters);
        };


        var getMedian = function(values) {

            values.sort(
                function(a, b) {
                    return a - b;
                }
            );

            var half = Math.floor(values.length/2);

            if (values.length % 2) {
                return values[half];
            } else {
                return (values[half - 1] + values[half]) / 2.0;
            }
        };

        $scope.resolveStory = function() {
            $wamp.getWampSession().call(rpc.getStory, getParameters())
                .then(function (response) {
                    Object.assign(story, JSON.parse(response[0]));
                    story.result = getMedian($scope.sizingArray = schema.getArray(room.schema));
                });
        };
});
