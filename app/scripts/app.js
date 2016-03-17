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
                redirectTo: '/user'
            });
    }).run(function($rootScope, pubsub, $wamp) {

        /**
         * On application start, a new WAMP connection will be established
         */
        var wamp = WS.connect(pubsub.baseUrl);
        $rootScope.connectionError = false;

        wamp.on("socket/connect", function(session) {
            $rootScope.connectionError = false;
            $rootScope.$apply();
            $wamp.setWampSession(session);
            console.log(session);
        });

        /**
         * If the connection between client and and server breaks down, an error message is displayed.
         * Since AutobahnJS tries to connect to the server all 5 seconds,
         * the message will fade away if the connection can be reestablished.
         */
        wamp.on("socket/disconnect", function(error) {
            $rootScope.connectionError = true;
            $rootScope.connectionErrorMessage = error.reason;
            $rootScope.$apply();
            console.log($rootScope.connectionErrorMessage);
        })
});
