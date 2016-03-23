'use strict';

/**
 * @ngdoc service
 * @name remoker.add
 * @description
 * # add
 * Value in remoker
 */
angular.module('remoker')
    .service('add', function($rootScope, $location, $wamp, rpc, user, room, story, join, parameters, onNewStory) {

        this.developer = function() {
            $wamp.getWampSession().call(rpc.addDeveloper, parameters.getParameters())
                .then(
                    function(response) {
                        Object.assign(room, JSON.parse(response[0]));
                        $wamp.subscribe(room.short_id);
                        $wamp.publish({user: user});
                        join.story();
                    },
                    function(exception) {
                        console.log(exception);
                        $scope.creationErrorMessage = exception.desc;
                        $scope.creationError = true;
                        $scope.$apply();
                    }
                );
        };
    });
