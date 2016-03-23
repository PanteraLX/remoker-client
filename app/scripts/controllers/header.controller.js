'use strict';

/**
 * @ngdoc function
 * @name remoker.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of remoker
 */
angular.module('remoker')
    .controller('HeaderCtrl', function($scope, room, story) {

        $scope.roomId = room.short_id;
        $scope.roomUrl = window.location.origin + '/#/room/' + room.short_id;
        $scope.hideInfo = (typeof $scope.roomId === 'undefined');


    });
