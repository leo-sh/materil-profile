'use strict';

app.controller('PublicSettingsController',
    ['$scope', '$state', '$stateParams', 'HTTP_CODES', 'envService', 'SettingsService', '$filter',
        function ($scope, $state, $stateParams, HTTP_CODES, envService, SettingsService, $filter) {


            $scope.user = {
                sex: '0',
                email: 'summmmit44@gmail.com',
                first_name: 'Sumit',
                last_name: 'Singh',
                nick_name: 'Sumit',
                company: 'Google',
                dob: new Date('1991-05-25'),
                address: '1600 Amphitheatre Pkwy',
                city: 'Mountain View',
                state: 'CA',
                biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
                postalCode: '94043'
            };
        }
    ]);