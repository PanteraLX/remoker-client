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

        $scope.roomIdBreadcrumb = room.short_id;
        $scope.hideRoomId = (typeof $scope.roomIdBreadcrumb === 'undefined');

        $scope.roomNameBreadcrumb = room.name;
        $scope.hideRoomName = (typeof $scope.roomNameBreadcrumb === 'undefined');

        $scope.storyNameBreadcrumb = story.name;
        $scope.hideStoryName = (typeof $scope.storyNameBreadcrumb === 'undefined');
    });
