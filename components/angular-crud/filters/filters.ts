/**
 * Created by Bob on 5/17/2014.
 */
var filters = angular.module('angularCrud', []);

filters
    .filter('booleanAsYesNo', function () {
        return function (input) {
            return input ? 'Yes' : 'No';
        }
    });