'use strict';

app.controller('NotificationsSettingsController',
    ['$scope', '$state', '$stateParams', 'HTTP_CODES', 'envService', 'SettingsService', '$filter', '$mdDialog',
        function ($scope, $state, $stateParams, HTTP_CODES, envService, SettingsService, $filter, $mdDialog) {

            $scope.notifications = {
                email_notifications: {
                    news_and_updates: true,
                    offers: false,
                },
                mobile_notifications: {
                    news_and_updates: true,
                    offers: false,
                }
            };
        }
    ]);