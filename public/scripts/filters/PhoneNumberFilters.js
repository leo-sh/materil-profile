'use strict';

/* Filters */
// need load the moment.js to use this filter. 
angular.module('app')
    .filter('PhoneNuFilter', function () {

        return function (string) {

            var length = string.length;
            var hello = string.slice('');

            var count = length + 2;
            var newString = [];
            do {

                newString[count] =  hello[length];
                if(length == 6){
                    newString[count++] = '-';
                }

                count--;
            } while (length--)

            console.log(newString);
            console.log(hello);

            return string;
        }
    })
