'use strict';

/**
 * @ngdoc service
 * @name remoker.cup
 * @description
 * # cup
 * Constant in remoker
 */
angular.module('remoker')
  .constant('cup', [
      {value: 'demi', index: 0},
      {value: 'short', index: 1},
      {value: 'tall', index: 2},
      {value: 'grande', index: 3},
      {value: 'venti', index: 4},
      {value: 'trenta', index: 5}
  ]);
