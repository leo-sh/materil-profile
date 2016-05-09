'use strict';

/* Filters */
// need load the moment.js to use this filter. 
angular.module('app')
    .filter('CreatePhoneNumberFilter', function () {

        return function (number, country_code) {

            if (number == "" || number == null || number == "undefined") {
                return 'Not Set';
            }

            number = maskPhoneNumber(number);

            var phone_number = '( + ' + country_code + ') ' + number;

            return phone_number;
        }
    });

function maskPhoneNumber(number) {

    if (number == "" || number == null) {
        return number;
    }

    number = reverseString(number);

    var newString = "";
    var length = number.length - 1, i = 0;

    do {

        if (i == 4) {

            newString = newString.concat('-');
            i = 0;
        }

        i++;
        newString = newString.concat(number[length--]);

    } while (length >= 0)

    return newString;
}

function reverseString(str) {

    var newStr = '';
    for (var i = str.length - 1; i >= 0; i--) {
        newStr = newStr.concat(str[i]);
    }
    return newStr;
}
