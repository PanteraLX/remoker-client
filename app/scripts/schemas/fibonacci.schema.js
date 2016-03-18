'use strict';

/**
 * @ngdoc service
 * @name remoker.fibonacci
 * @description
 * # fibonacci
 * Constant in remoker
 */
angular.module('remoker')
  .constant('fibonacci', [
      {value: 1, index: 0},
      {value: 2, index: 1},
      {value: 3, index: 2},
      {value: 5, index: 3},
      {value: 8, index: 4},
      {value: 13, index: 5},
      {value: 20, index: 6}
  ]);
