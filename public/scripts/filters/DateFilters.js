'use strict';

/* Filters */
// need load the moment.js to use this filter. 
angular.module('app')
    .filter('FromNowFilter', function () {

        return function (date) {
            return moment(date).fromNow();
        }
    })
    .filter('SexFilter', function () {

        return function (sex) {
            return (sex == 0) ? 'Female' : 'Male';
        }
    })
    .filter('DateFilter', function () {

        return function (date) {
            return moment(date).format('MMM DD, YYYY');
        }
    })
    .filter('CheckDateAndFormatFilter',
        ['ACTIVITY_TYPES',
            function (ACTIVITY_TYPES) {

                return function (item, activity_type) {

                    var changedItem;

                    switch (activity_type) {

                        case ACTIVITY_TYPES.NO_ACTIVITY:
                            break;

                        case ACTIVITY_TYPES.DETAILS_UPDATING_ACTIVITY:

                            if (item == '' || item == null || item == 'undefined') {
                                changedItem = item;
                            } else if (item == 0) {
                                changedItem = 'Female';
                            } else if (item == 1) {
                                changedItem = 'Male';
                            } else if (moment(item).isValid()) {
                                changedItem = moment(item).format('MMM DD, YYYY');
                            } else {
                                changedItem = item;
                            }
                            break;

                        default:
                            changedItem = item;
                    }

                    return changedItem;
                }
            }
        ]
    )
