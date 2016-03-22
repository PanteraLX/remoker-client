'use strict';

/**
 * @ngdoc service
 * @name remoker.onReestimation
 * @description
 * # onReestimation
 * Service in remoker
 */
angular.module('remoker')
    .service('onReestimation', function($rootScope, $location, $wamp, user, story, rpc, parameters) {

        $rootScope.$on('reestimation', function() {
            story.estimations = [];
            if (user.is_master) {
                $location.path('/overview');
            } else {
                $location.path('/estimation');
            }
            $rootScope.$apply();
        });
    });
