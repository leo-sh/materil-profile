'use strict';

app.controller('EpaperController',
    ['$rootScope', '$scope', '$state', '$http', '$window',
        function ($rootScope, $scope, $state, $http, $window) {

            $scope.paper = {
                date: new Date()
            };

            $scope.downloadPaper = function (paper) {
                var date = moment(paper.date).format('YYYY/MM/DD');
                var dateType = moment(paper.date).format('YYYYMMDD');

                var url = "https://epaper.thehindu.com/pdf/" + date + "/" + dateType + paper.edition + paper.type + ".zip";

                $http.get(url)
                    .then(function (response) {
                        console.log(response)
                    }, function (response) {
                        console.log(response)
                    });

                //$window.open(url);
            }
        }
    ]);