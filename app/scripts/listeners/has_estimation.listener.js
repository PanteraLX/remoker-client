'use strict';

/**
 * @ngdoc service
 * @name remoker.listener
 * @description
 * # listener
 * Service in remoker
 */
angular.module('remoker')
    .service('onHasEstimation', function($rootScope, story) {
        $rootScope.$on('hasEstimation', function(event, hasEstimation) {
            Object.assign(story.hasEstimation, hasEstimation);
            $rootScope.$apply();
        });
    });
