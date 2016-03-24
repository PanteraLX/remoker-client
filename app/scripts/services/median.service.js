'use strict';

/**
 * @ngdoc service
 * @name remoker.median
 * @description
 * # add
 * This service calculates the median of an array
 */
angular.module('remoker')
    .service('median', function () {

        /**
         * This method adds a Developer to the Room object via a RPC
         *
         * @param estimations
         * @returns {*}
         */
        this.calculate = function (estimations) {

            console.log(estimations);
            var results = [],
                index;

            if (estimations.length === 0) {
                return 0;
            }

            angular.forEach(estimations, function (estimation) {
                results.push(estimation.value);
            });
            results.sort(function (a, b) {
                return a - b;
            });

            if (results.length % 2) {
                index = results[Math.floor(results.length / 2)];
            } else {
                index = (results[Math.floor(results.length / 2) - 1] + results[Math.floor(results.length / 2)]) / 2.0;
            }

            return Math.round(index);
        };
    });
