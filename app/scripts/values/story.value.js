'use strict';

/**
 * @ngdoc service
 * @name remoker.story
 * @description
 * # story
 * Value in remoker.
 */
angular.module('remoker')
    .value('story', {
        estimations: [],
        getMedian: function(sizingArray) {

            var results = [];
            var index;

            if(this.estimations.length === 0) {
                return 0;
            }

            angular.forEach(this.estimations, function(estimation) {
                results.push(estimation.value);
            });
            results.sort(function(a, b) {
                return a - b;
            });

            if(results.length % 2) {
                index = results[Math.floor(results.length / 2)];
            } else {
                index = (results[Math.floor(results.length / 2) - 1] + results[Math.floor(results.length / 2)]) / 2.0;
            }

            return sizingArray[Math.round(index)].value;
        }
    });
