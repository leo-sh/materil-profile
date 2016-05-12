// getting correct environment api urls
app.service('ProfileFactory',
    ['$http', '$q', 'API_TYPE', 'GetURLFactory',
        function ($http, $q, API_TYPE, GetURLFactory) {

            var Reddit = function () {
                this.items = [];
                this.busy = false;
                this.limit = 10;
                this.offset = 0;
                this.count = 0;
            };
            var offset = 0;

            Reddit.prototype.nextPage = function () {
                if (this.busy)
                    return;
                this.busy = true;
                console.log(this.offset);

                var url = GetURLFactory.getURL() + API_TYPE._ACTIVITIES_.FETCH;
                $http.get(url,
                    {
                        params: {limit: this.limit, offset: this.offset}
                    })
                    .success(function (response) {
                        console.log(response);
                        var items = response.result.data.activities;
                        var length = this.limit;
                        for (var i = 0; i < items.length; i++) {
                            this.items.push(items[i]);
                            console.log(i);
                            offset++;
                        }
                        this.offset = offset;
                        this.busy = false;
                    }.bind(this));
            };

            return Reddit;
        }]
)