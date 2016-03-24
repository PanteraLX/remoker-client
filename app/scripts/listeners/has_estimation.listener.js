'use strict';

/**
 * @ngdoc service
 * @name remoker.listener
 * @description
 * # listener
 * Service in remoker
 */
angular.module('remoker')
    .service('onHasEstimation', function ($rootScope, story) {

        /**
         * The 'hasEstimation' is fired when a new developer has send an estimation
         * and this estimation has benn added to the hasEstimation array in the overview view.
         *
         * @return void
         */
        $rootScope.$on('hasEstimation', function (event, hasEstimation) {
            Object.assign(story.hasEstimation, hasEstimation);
            $rootScope.$apply();
        });
    });
