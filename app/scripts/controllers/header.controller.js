'use strict';

/**
 * @ngdoc function
 * @name remoker.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of remoker
 */
angular.module('remoker')
    .controller('HeaderCtrl', function ($scope, room) {
        $scope.roomId = room.id;
        $scope.roomUrl = window.location.origin + '/#/room/' + room.id;
        $scope.hideInfo = (typeof $scope.roomId === 'undefined');
    });
