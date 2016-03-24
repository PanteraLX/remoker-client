'use strict';

/**
 * @ngdoc service
 * @name remoker.onReestimation
 * @description
 * # onReestimation
 * Service in remoker
 */
angular.module('remoker')
    .service('onReestimation', function ($rootScope, $location, user, story) {

        /**
         * The reestimation event is fired, when the master wants to reestimate the current story.
         *
         * @return void
         */
        $rootScope.$on('reestimation', function () {
            story.estimations = [];
            story.hasEstimation = {};
            if (user.is_master) {
                $location.path('/overview');
            } else {
                $location.path('/estimation');
            }
            $rootScope.$apply();
        });
    });
