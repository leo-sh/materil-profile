// getting correct environment api urls
app.service('GetURLFactory',
    ['envService', function (envService) {

        return {
            getURL: function () {

                return envService.read('API_URL');
            }
        }
    }]
)