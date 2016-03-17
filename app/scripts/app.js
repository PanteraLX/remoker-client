'use strict';

/**
 * @ngdoc overview
 * @name remoker
 * @description
 * # remoker
 *
 * Main module of the application.
 */
angular
    .module('remoker', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/user', {
                templateUrl: 'views/user.view.html',
                controller: 'UserCtrl',
                controllerAs: 'user'
            })
            .when('/room', {
                templateUrl: 'views/room.view.html',
                controller: 'RoomCtrl',
                controllerAs: 'room'
            })
            .when('/story', {
                templateUrl: 'views/story.view.html',
                controller: 'StoryCtrl',
                controllerAs: 'story'
            })
            .when('/estimation', {
                templateUrl: 'views/estimation.view.html',
                controller: 'EstimationCtrl',
                controllerAs: 'estimation'
            })
            .when('/overview', {
                templateUrl: 'views/overview.view.html',
                controller: 'OverviewCtrl',
                controllerAs: 'overview'
            })
            .when('/result', {
                templateUrl: 'views/result.view.html',
                controller: 'ResultCtrl',
                controllerAs: 'result'
            })
            .otherwise({
                redirectTo: '/room'
            });
    });
