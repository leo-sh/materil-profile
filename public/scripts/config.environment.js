// config

var app =
        angular.module('app')
            .run(
                ['$rootScope', '$location', 'environmentService',
                    function ($rootScope, $location, environmentService) {

                        // check if the user is logged in and page is restricted without login
                        $rootScope.$on('$stateChangeSuccess', function (e, toState, toParams, fromState, fromParams) {
                            e.preventDefault();

                            environmentService.setEnvironment($location.host());
                        });
                    }
                ]
            )
            .config(
                function (envServiceProvider) {
                    // set the domains and variables for each environment
                    envServiceProvider.config({
                        domains: {
                            development: ['localhost'],
                            staging: ['162.243.57.151'],
                            production: ['acme.com']
                            // anotherStage: ['domain1', 'domain2']
                        },
                        vars: {
                            development: {
                                HOST: 'localhost',
                                PORT: '8080',
                                API_URL: 'http://localhost:8080',
                                STATIC_URL: '//localhost/static'
                            },
                            staging: {
                                HOST: '162.243.57.151',
                                PORT: '8080',
                                API_URL: 'http://162.243.57.151:8080',
                                STATIC_URL: '//static.acme.com'
                            },
                            production: {
                                HOST: '162.243.57.151',
                                PORT: '8080',
                                API_URL: 'http://162.243.57.151:8080',
                                STATIC_URL: '//static.acme.com'
                            }
                        }
                    });
                    envServiceProvider.check();
                })
            .service('environmentService', ['envService',
                function (envService) {

                    return {
                        'setEnvironment': function (host) {

                            if (host == "162.243.57.151") {
                                envService.set('staging');
                            }
                        }
                    }
                }])
    ;
