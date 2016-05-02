'use strict';

app.controller('NotificationsSettingsController',
    ['$scope', '$state', '$stateParams', 'HTTP_CODES', 'envService', 'SettingsService', '$filter', 'showToastService',
        function ($scope, $state, $stateParams, HTTP_CODES, envService, SettingsService, $filter, showToastService) {

            SettingsService.getNotifications()
                .then(function (response) {

                    if (response.statusCode == HTTP_CODES.SUCCESS.OK) {

                        $scope.notification = {
                            email_news: response.data.email_news,
                            email_offers: response.data.email_offers,
                            mobile_news: response.data.mobile_news,
                            mobile_offers: response.data.mobile_offers
                        }
                    } else {
                        showToastService.showSimpleToast('Notifications cannot be fetched right now!!');
                    }

                }, function (response) {
                    showToastService.showSimpleToast('Problem in fetching Notifications right now!!');
                });

            $scope.onChangeNotification = function (notificationValue, type) {


                var notification = {};

                if (type == 'email_news') {
                    notification.email_news = notificationValue
                    notification.email_offers = $scope.notification.email_offers
                    notification.mobile_news = $scope.notification.mobile_news
                    notification.mobile_offers = $scope.notification.mobile_offers
                } else if (type == 'email_offers') {
                    notification.email_news = $scope.notification.email_news
                    notification.email_offers = notificationValue
                    notification.mobile_news = $scope.notification.mobile_news
                    notification.mobile_offers = $scope.notification.mobile_offers
                } else if (type == 'mobile_news') {
                    notification.email_news = $scope.notification.email_news
                    notification.email_offers = $scope.notification.email_offers
                    notification.mobile_news = notificationValue
                    notification.mobile_offers = $scope.notification.mobile_offers
                } else if (type == 'mobile_offers') {
                    notification.email_news = $scope.notification.email_news
                    notification.email_offers = $scope.notification.email_offers
                    notification.mobile_news = $scope.notification.mobile_news
                    notification.mobile_offers = notificationValue
                }

                SettingsService.changeNotifications(notification)
                    .then(function (response) {

                        if (response.statusCode == HTTP_CODES.SUCCESS.OK) {
                            showToastService.showSimpleToast('News and Update Notification is changed!!');
                        } else {
                            showToastService.showSimpleToast('Notifications cannot change right now!!');
                        }

                    }, function (response) {
                        showToastService.showSimpleToast('Problem in changing Notifications right now!!');
                    });

            }
        }
    ]);