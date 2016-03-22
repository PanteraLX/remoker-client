'use strict';

/**
 * @ngdoc function
 * @name remoker.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of remoker
 */
angular.module('remoker')
    .controller('UserCtrl', function($scope, $cookies, $wamp, $location, user, rpc, parameters) {

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

                        $location.path('/room');
                        $scope.$apply();
                    },
                    // Is called when the backend has thrown an exception
                    function(exception) {
                        $scope.creationError = true;
                        $scope.creationErrorMessage = exception.desc;
                        $scope.$apply();
                        console.log(exception);
                    }
                );
        }
    });
