// getting correct environment api urls
app.service('ProfileFactory',
    ['$http', '$q', 'API_TYPE', 'GetURLFactory',
        function ($http, $q, API_TYPE, GetURLFactory) {

            var Reddit = function () {
                this.items = [];
                this.busy = false;
                this.page = 1;
                this.offset = 0;
                this.count = 0;
            };
            var offset = 0;

            Reddit.prototype.nextPage = function () {

                if (this.busy)
                    return;
                this.busy = true;

                var url = GetURLFactory.getURL() + API_TYPE._ACTIVITIES_.FETCH;
                $http.get(url,
                    {
                        params: {offset: this.offset, limit: 10}
                    })
                    .success(function (response) {

                        for (var i = 0; i < response.result.data.activities.length; i++) {

                            //console.log(response.result.data.activities[i]);
                            this.items.push(response.result.data.activities[i]);
                        }

                        this.offset = this.offset + 10;
                        this.busy = false;
                    }.bind(this));
            };

            return Reddit;
        }]
)