'use strict';

/**
 * @ngdoc function
 * @name remoker.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of remoker
 */
angular.module('remoker')
    .controller('UserCtrl', function($scope, $cookies, $routeParams, $wamp, $location, user, rpc, room, parameters, join, add) {

        if(typeof ($routeParams.roomId) !== 'undefined') {
            room.short_id = $routeParams.roomId;
            join.room();
        }

        /**
         * Calls the createUserAction in the backend server.
         *
         * If no userName is set, the user will be called John Doe from now on.
         *
         * This is the first time in this application a remote procedure is called.
         * The structuring of all following RP calls is quite the same.
         */
        $scope.createUser = function() {
            user.name = typeof $scope.userName === 'undefined' || $scope.userName === '' ? 'John Doe' : $scope.userName;
            $wamp.getWampSession().call(rpc.createUser, parameters.getParameters())
                .then(
                    // Is called when the promise is fullfilled
                    function(response) {
                        Object.assign(user, JSON.parse(response[0]));
                        $cookies.put('user', user.short_id);

                        if (typeof room.short_id === 'undefined') {
                            $location.path('/room');
                            $scope.$apply();
                        } else {
                            add.developer();
                        }
                    },
                    // Is called when the backend has thrown an exception
                    function(exception) {
                        $scope.creationError = true;
                        $scope.creationErrorMessage = exception.desc;
                        $scope.$apply();
                        console.log(exception);
                    }
                );
        };

    });
