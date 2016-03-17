'use strict';

/**
 * @ngdoc function
 * @name remoker.controller:RoomCtrl
 * @description
 * # RoomCtrl
 * Controller of remoker
 */
angular.module('remoker')
    .controller('RoomCtrl', function($scope, $cookies, $wamp, $location, user, room, rpc, schema) {

        /**
         * Loads all possible schema variations out of the schema service
         */
        $scope.schemas = schema.getSchemas();

        /**
         * Fetches all the necessary parameters for the RP-call
         */
        var getParameters = function() {
            var parameters = {};
            parameters.user = user;
            parameters.room = room;
            return JSON.stringify(parameters);
        };

        /**
         *
         *
         * @param schema
         */
        $scope.setSchema = function(schema) {
            room.schema = schema
        };

        /**
         * Calls the createRoomAction in the backend server.
         */
        $scope.createRoom = function() {
            room.name = $scope.roomName;
            $wamp.getWampSession().call(rpc.createRoom, getParameters())
                .then(
                    function(response) {
                        Object.assign(room, JSON.parse(response[0]));
                        $cookies.put('room', room.short_id);

                        $wamp.subscribe(room.short_id);

                        $location.path('/story');
                        $scope.$apply();
                    },
                    function(exception) {
                        $scope.creationError = true;
                        $scope.creationErrorMessage = exception.desc;
                        $scope.$apply();
                        console.log(exception);
                    }
                );
        };

        /**
         * Calls the getRoomAction in the backend server.
         */
        $scope.getRoom = function() {
            room.short_id = $scope.roomId;
            $wamp.getWampSession().call(rpc.getRoom, getParameters())
                .then(
                    function(response) {
                        Object.assign(room, JSON.parse(response[0]));
                        $cookies.put('room', room.short_id);

                        $wamp.subscribe(room.short_id);

                        $location.path('/estimation');
                        $scope.$apply();
                    },
                    function(exception) {
                        $scope.joinError = true;
                        $scope.joinErrorMessage = exception.desc;
                        $scope.$apply();
                        console.log(exception);
                    }
                );
        };
    });
