'use strict';

/**
 * @ngdoc function
 * @name app.config:uiRouter
 * @description
 * # Config
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams', 'AuthService',
            function ($rootScope, $state, $stateParams, AuthService) {

                // check if the user is logged in and page is restricted without login
                $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
                    if (toState.data.restricted && AuthService.isAuthenticated() == false) {
                        e.preventDefault();
                        var alert = {
                            'statusText': 'You are not Logged In!!'
                        };
                        $state.go('authentication.signin', {alertParam: alert});
                    } else if (!toState.data.restricted && AuthService.isAuthenticated() == true) {
                        e.preventDefault();
                        $state.go('page.home');
                    }
                });

                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG',
            function ($stateProvider, $urlRouterProvider, MODULE_CONFIG) {
                var p = getParams('layout'),
                    l = p ? p + '.' : '',
                    layout = 'views/layout.' + l + 'html',
                    aside = 'views/aside.' + l + 'html',
                    content = 'views/content.' + l + 'html';

                $urlRouterProvider
                    .otherwise('/page/home');
                $stateProvider
                // authentication pages
                    .state('authentication', {
                        url: '/authentication',
                        template: '<div class="indigo bg-big"><div ui-view class="fade-in-down smooth"></div></div>'
                    })
                    .state('authentication.signin', {
                        url: '/signin',
                        params: {alertParam: null},
                        templateUrl: 'views/authentication/signin.html',
                        controller: 'authenticationController',
                        resolve: load(['scripts/controllers/authenticationController.js']),
                        data: {
                            restricted: false
                        }
                    })
                    .state('authentication.activation', {
                        url: '/activate/:user_id/:activation_code',
                        params: {alertParam: null},
                        templateUrl: 'views/authentication/activation.html',
                        controller: 'activationController',
                        resolve: load(['scripts/controllers/activationController.js', 'scripts/services/authenticationService.js']),
                        data: {
                            restricted: false
                        }
                    })
                    .state('authentication.resetPassword', {
                        url: '/reset/:user_id/:reset_code',
                        params: {alertParam: null},
                        templateUrl: 'views/authentication/activation.html',
                        controller: 'resetPasswordController',
                        resolve: load(['scripts/controllers/activationController.js', 'scripts/services/authenticationService.js']),
                        data: {
                            restricted: false
                        }
                    })
                    .state('authentication.signup', {
                        url: '/signup',
                        params: {alertParam: null},
                        templateUrl: 'views/authentication/signup.html',
                        controller: 'authenticationController',
                        resolve: load(['scripts/controllers/authenticationController.js', 'scripts/services/AuthService.js']),
                        data: {
                            restricted: false
                        }
                    })
                    .state('authentication.forgot-password', {
                        url: '/forgot-password',
                        params: {alertParam: null},
                        templateUrl: 'views/authentication/forgot-password.html',
                        controller: 'authenticationController',
                        resolve: load(['scripts/controllers/authenticationController.js', 'scripts/services/authenticationService.js']),
                        data: {
                            restricted: false
                        }
                    })
                    .state('authentication.change-password', {
                        url: '/change-password/:user_id',
                        params: {alertParam: null, userParam: null},
                        templateUrl: 'views/authentication/change-password.html',
                        controller: 'authenticationController',
                        resolve: load(['scripts/controllers/authenticationController.js', 'scripts/services/authenticationService.js']),
                        data: {
                            restricted: false
                        }
                    })
                    .state('page', {
                        url: '/page',
                        controller: 'HomeController',
                        resolve: load(['scripts/controllers/HomeController.js', 'scripts/services/HomeService.js']),
                        views: {
                            '': {
                                templateUrl: layout
                            },
                            'aside': {
                                templateUrl: aside
                            },
                            'content': {
                                templateUrl: content
                            }
                        }
                    })
                    .state('page.blank', {
                        url: '/blank',
                        templateUrl: 'views/pages/blank.html',
                        data: {
                            title: 'Blank',
                            restricted: true
                        }
                    })
                    .state('page.home', {
                        url: '/home',
                        params: {userParam: null},
                        templateUrl: 'views/pages/home.html',
                        controller: 'authenticationController',
                        resolve: load(['scripts/controllers/authenticationController.js', 'scripts/services/authenticationService.js']),
                        data: {
                            title: 'Home',
                            restricted: true
                        }
                    })
                    .state('app', {
                        url: '/app',
                        abstract: true,
                        controller: 'HomeController',
                        resolve: load(['scripts/controllers/HomeController.js', 'scripts/services/HomeService.js']),
                        views: {
                            '': {
                                templateUrl: layout
                            },
                            'aside': {
                                templateUrl: aside
                            },
                            'content': {
                                templateUrl: content
                            }
                        }
                    })
                    // Profile Page ------------------------------------------------------------------------------------Start
                    .state('app.profile', {
                        url: '/profile',
                        templateUrl: 'views/pages/profile.html',
                        controller: 'ProfileController',
                        resolve: load(['scripts/controllers/material.js',
                            'scripts/controllers/ProfileController.js',
                            'scripts/services/ProfileService.js',
                            'scripts/services/LabelsService.js',
                            'scripts/services/ContactsService.js',
                            'scripts/factories/ProfileFactory.js',
                            'scripts/filters/PhoneNumberFilters.js',
                            'moment']),
                        data: {
                            title: 'Profile',
                            folded: true,
                            restricted: true
                        }
                    })
                    // Profile Page ------------------------------------------------------------------------------------Start
                    .state('app.hindu', {
                        url: '/epaper',
                        templateUrl: 'views/pages/hindu.html',
                        controller: 'EpaperController',
                        resolve: load(['scripts/controllers/material.js',
                            'scripts/controllers/EpaperController.js',
                            'moment',
                            'bower_components/angular-material-datetimepicker/js/angular-material-datetimepicker.min.js']),
                        data: {
                            title: 'Profile',
                            folded: true,
                            restricted: true
                        }
                    })
                    // Settings Page ------------------------------------------------------------------------------------Start
                    .state('app.settings', {
                        url: '/settings',
                        controller: 'SettingsController',
                        templateUrl: 'views/pages/settings.html',
                        resolve: load([
                            'scripts/controllers/material.js',
                            'scripts/services/HomeService.js',
                            'ngImgCrop',
                            'scripts/controllers/SettingsController.js',
                            'scripts/services/SettingsService.js']),
                        data: {
                            title: 'Settings',
                            restricted: true,
                            folded: true
                        }
                    })
                    .state('app.settings.profile', {
                        url: '/profile',
                        controller: 'ImageCropController',
                        templateUrl: 'views/pages/partials/settings/image_crop.html',
                        resolve: load(['scripts/controllers/ImageCropController.js',
                            'scripts/services/ShowToastService.js',
                            'scripts/services/HomeService.js',
                            'bower_components/ng-file-upload/ng-file-upload.min.js',
                            'bower_components/ng-file-upload/ng-file-upload-shim.min.js',]),
                        data: {
                            title: 'Profile Pic',
                            restricted: true,
                            child: true
                        }
                    })
                    .state('app.settings.public', {
                        url: '/public',
                        controller: 'PublicSettingsController',
                        templateUrl: 'views/pages/partials/settings/public_settings.html',
                        resolve: load(['scripts/controllers/PublicSettingsController.js',
                            'scripts/services/ShowToastService.js',]),
                        data: {
                            title: 'Public Settings',
                            restricted: true
                        }
                    })
                    .state('app.settings.account', {
                        url: '/account',
                        controller: 'AccountSettingsController',
                        templateUrl: 'views/pages/partials/settings/account_settings.html',
                        resolve: load(['scripts/controllers/AccountSettingsController.js',
                            'scripts/services/ShowToastService.js',
                            'scripts/filters/PhoneNumberFilters.js',]),
                        data: {
                            title: 'Account Settings',
                            restricted: true
                        }
                    })
                    .state('app.settings.notifications', {
                        url: '/notifications',
                        controller: 'NotificationsSettingsController',
                        templateUrl: 'views/pages/partials/settings/notifications_settings.html',
                        resolve: load(['scripts/controllers/NotificationsSettingsController.js', 'scripts/services/ShowToastService.js']),
                        data: {
                            title: 'Notifications Settings',
                            restricted: true
                        }
                    })
                    // settings ------------------------------------------------------------------------------------Finish
                    .state('app.contacts', {
                        url: '/contacts',
                        templateUrl: 'views/application/contacts/index.html',
                        data: {
                            title: 'List',
                            restricted: true
                        }
                    })
                    .state('app.contactslist', {
                        url: '/contacts/list',
                        controller: 'contactsController',
                        templateUrl: 'views/application/contacts/list.html',
                        resolve: load(['scripts/controllers/contactsController.js']),
                        data: {
                            title: 'Contact List',
                            restricted: true
                        }
                    })
                ;

                function load(srcs, callback) {
                    return {
                        deps: ['$ocLazyLoad', '$q',
                            function ($ocLazyLoad, $q) {
                                var deferred = $q.defer();
                                var promise = false;
                                srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                                if (!promise) {
                                    promise = deferred.promise;
                                }
                                angular.forEach(srcs, function (src) {
                                    promise = promise.then(function () {
                                        angular.forEach(MODULE_CONFIG, function (module) {
                                            if (module.name == src) {
                                                if (!module.module) {
                                                    name = module.files;
                                                } else {
                                                    name = module.name;
                                                }
                                            } else {
                                                name = src;
                                            }
                                        });
                                        return $ocLazyLoad.load(name);
                                    });
                                });
                                deferred.resolve();
                                return callback ? promise.then(function () {
                                    return callback();
                                }) : promise;
                            }]
                    }
                }

                function getParams(name) {
                    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                        results = regex.exec(location.search);
                    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
                }

            }
        ]
    );
