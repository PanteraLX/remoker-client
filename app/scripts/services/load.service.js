'use strict';

/**
 * @ngdoc service
 * @name remoker.load
 * @description
 * # load
 * Service in remoker
 */
angular.module('remoker')
    .service('load', function($wamp, $rootScope, $location, rpc, room, user, parameters) {

        /**
         * Async call to load the room object while the developer is creating a new user
         *
         * @return void
         */
        this.room = function() {
            $wamp.getWampSession().call(rpc.getRoom, parameters.getParameters())
                .then(
                    function(response) {
                        Object.assign(room, JSON.parse(response[0]));
                        return response;
                    },
                    function() {
                        $location.path("/404");
                        $rootScope.$apply();
                    }
                );
        };

        /**
         * Async call to load the user object
         *
         * @return void
         */
        this.user = function() {
            $wamp.getWampSession().call(rpc.getUser, parameters.getParameters())
                .then(
                    function(response) {
                        user.name = JSON.parse(response[0]).name;
                        $rootScope.$broadcast('user_loaded', JSON.parse(response[0]).name);
                        $rootScope.$apply();
                    },
                    function(exception) {
                        console.log(exception);
                    }
                );
        };
    });
