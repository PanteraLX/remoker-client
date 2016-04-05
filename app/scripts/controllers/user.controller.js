'use strict';

/**
 * @ngdoc function
 * @name remoker.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller for the User view
 */
angular.module('remoker')
    .controller('UserCtrl', function($scope, $cookies, $routeParams, $wamp, $location, $rootScope,
                                     user, rpc, room, parameters, join, add, load) {

        $scope.hideUseUser = true;

        /**
         * This part will be executed if a Developer wants to join a room with a given url.
         * e.g. http://remoker.test/room/123abc
         *
         * The route /room/{roomId} routes directly to the user view (and controller).
         * The corresponding room object will be loaded via an async rpc in the load service
         */
        if (typeof $routeParams.roomId !== 'undefined') {
            room.id = $routeParams.roomId;
            load.room();
            $rootScope.$on('room_exception', function (event, exception) {
                console.log(exception);
                $scope.loadErrorMessage = 'invalid_room_id';
                $scope.loadError = true;
                $scope.$apply();
            });

        }

        /**
         * This part will be executed when a cookie with a userID is set.
         * load.user() fetches the corresponding user name to user id, so that the user has the choice between
         * a new user object or the existing one.
         */
        if (typeof $cookies.get('user') !== 'undefined') {
            $scope.hideUseUser = false;
            user.id = $cookies.get('user');
            load.user();
            user.id = '';
            $rootScope.$on('user_loaded', function (event, userName) {
                $scope.usedUserName = userName;
            });
        }

        /**
         * Sets a cookie with key 'user' and the value of the current userId
         * The expiration date is in a half year from now
         *
         * @return void
         */
        var setCookie = function (userId) {
            var now = new Date(),
                exp = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
            $cookies.put('user', userId, {
                expires: exp
            });

        };

        /**
         * Calls the createUserAction in the backend server.
         *
         * This is the first time in this application a remote procedure is called.
         * The structuring of all following RP calls is quite the same.
         *
         * @return void
         */
        $scope.createUser = function (userName) {
            // If no userName is set, the user will be called John Doe from now on.
            user.name = typeof userName === 'undefined' || userName === '' ? 'John Doe' : userName;

            $wamp.getWampSession().call(rpc.createUser, parameters.getParameters())
                .then(
                    // Is called when the promise is fulfilled
                    function (response) {
                        // the response is a stringified user object stored in an array
                        // and should be assigned to the Angular user value
                        Object.assign(user, JSON.parse(response[0]));
                        setCookie(user.id);

                        // If there is already a room loaded with load.room() the user will be added to this room,
                        // otherwise he will be transferred to the room view
                        if (typeof room.id === 'undefined') {
                            $location.path('/room');
                            $scope.$apply();
                        } else {
                            add.developer();
                        }
                    },
                    // Is called when the backend has thrown an exception
                    function (exception) {
                        $scope.creationError = true;
                        $scope.creationErrorMessage = exception.desc;
                        $scope.$apply();
                        console.log(exception);
                    }
                );
        };
    });
