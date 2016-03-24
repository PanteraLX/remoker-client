'use strict';

/**
 * @ngdoc function
 * @name remoker.controller:RoomCtrl
 * @description
 * # RoomCtrl
 * Controller of remoker
 */
angular.module('remoker')
    .controller('RoomCtrl', function($scope, $cookies, $wamp, $location, user,
                                     room, rpc, schema, parameters, join) {
        if (typeof user.id === 'undefined') {
            $location.path("/");
        }

        /**
         * Loads all possible schema variations out of the schema service
         */
        $scope.schemas = schema.getSchemas();

        /**
         * Is called when the master selects one of the given schemas in the room view
         *
         * @param schema
         */
        $scope.setSchema = function(schema) {
            room.schema = schema;
        };

        /**
         * Calls the createRoomAction in the backend server.
         *
         * @return void
         */
        $scope.createRoom = function() {

            // User input for room name
            room.name = $scope.roomName;

            $wamp.getWampSession().call(rpc.createRoom, parameters.getParameters())
                .then(
                    function(response) {
                        Object.assign(room, JSON.parse(response[0]));

                        //
                        Object.assign(user, room.master);

                        $cookies.put('room', room.id);
                        $wamp.subscribe(room.id);
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
         * Is called when a developer wants to join the room with the roomID (not via url)
         *
         * Calls the getRoomAction in the backend server. The developer subscribes to the remoker topic
         * and notifies there all other users that he joined the room.
         *
         * After that, the developer should join to a story if there is any (see join.story())
         *
         * @return void
         */
        $scope.getRoom = function() {
            room.id = $scope.roomId;
            $wamp.getWampSession().call(rpc.getRoom, parameters.getParameters())
                .then(
                    function(response) {
                        Object.assign(room, JSON.parse(response[0]));
                        $wamp.subscribe(room.id);
                        $wamp.publish({user: user});
                        join.story();
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
