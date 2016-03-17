'use strict';

/**
 * @ngdoc service
 * @name remoker.schema
 * @description
 * # schema
 * Service in remoker
 */
angular.module('remoker')
    .service('schema', function() {
        this.getSchemas = function() {
            return ['fibonacci', 'shirt', 'cup']
        }
    });
