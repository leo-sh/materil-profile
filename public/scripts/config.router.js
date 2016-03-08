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
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
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
                        templateUrl: 'views/authentication/signin.html'
                    })
                    .state('authentication.signup', {
                        url: '/signup',
                        templateUrl: 'views/authentication/signup.html'
                    })
                    .state('authentication.forgot-password', {
                        url: '/forgot-password',
                        templateUrl: 'views/authentication/forgot-password.html'
                    })
                    .state('page', {
                        url: '/page',
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
                        data: {title: 'Blank'}
                    })
                    .state('page.home', {
                        url: '/home',
                        templateUrl: 'views/pages/home.html',
                        data: {
                            title: 'Home'
                        }
                    })
                    .state('page.profile-settings', {
                        url: '/profile-settings',
                        templateUrl: 'views/pages/profile-settings.html',
                        data: {
                            title: 'Profile'
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
