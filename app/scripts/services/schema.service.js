'use strict';

/**
 * @ngdoc service
 * @name remoker.schema
 * @description
 * # schema
 * Service in remoker
 */
angular.module('remoker')
    .service('schema', function(fibonacci, shirt, cup) {

        this.getSchemas = function() {
            return ['fibonacci', 'shirt', 'cup'];
        };

        this.getCardset = function(schema) {
            var cardSet = [];
            var rowArray = [];
            var row = 0;
            angular.forEach(this.getArray(schema), function(value, key) {
                rowArray.push(value);
                cardSet[row] = rowArray;
                if(key % 3 === 2) {
                    rowArray = [];
                    row++;
                }
            });
            return cardSet;
        };

        this.getArray = function(schema) {
            switch(schema) {
                case 'shirt':
                    return shirt;
                case 'cup':
                    return cup;
                default:
                    return fibonacci;
            }
        };
    });
