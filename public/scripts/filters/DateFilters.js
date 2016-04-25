'use strict';

/* Filters */
// need load the moment.js to use this filter. 
angular.module('app')
    .filter('FromNowFilter', function () {

        return function (date) {
            return moment(date).fromNow();
        }
    })
    .filter('CheckDateAndFormatFilter', function () {

        return function (item) {

            if (moment(item).isValid()) {
                return moment(item).format('MMM DD, YYYY');
            } else {
                return item;
            }
        }
    })
