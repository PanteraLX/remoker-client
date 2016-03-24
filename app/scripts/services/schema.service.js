'use strict';

/**
 * @ngdoc service
 * @name remoker.schema
 * @description
 * # schema
 * Service in remoker
 */
angular.module('remoker')
    .service('schema', function (fibonacci, shirt, cup) {

        /**
         * Sends back all the possible schemas, so that the master can select on in the room view
         *
         * @returns {string[]}
         */
        this.getSchemas = function () {
            return ['fibonacci', 'shirt', 'cup'];
        };

        /**
         * Returns an object with all the possible values of the chosen schema
         *
         * @param schema
         * @returns {*}
         */
        this.getArray = function (schema) {
            switch (schema) {
            case 'shirt':
                return shirt;
            case 'cup':
                return cup;
            default:
                return fibonacci;
            }
        };
    });
