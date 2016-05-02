
app.service('showToastService',
    ['$mdToast', function ($mdToast) {

        var last = {
            bottom: false,
            top: true,
            left: false,
            right: true
        };

        var toastPosition = angular.extend({}, last);
        var getToastPosition = function () {
            sanitizePosition();
            return Object.keys(toastPosition)
                .filter(function (pos) {
                    return toastPosition[pos];
                })
                .join(' ');
        };

        function sanitizePosition() {
            var current = toastPosition;
            if (current.bottom && last.top) current.top = false;
            if (current.top && last.bottom) current.bottom = false;
            if (current.right && last.left) current.left = false;
            if (current.left && last.right) current.right = false;
            last = angular.extend({}, current);
        }

        return {
            showSimpleToast: function (message) {

                var pinTo = getToastPosition();
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(message)
                        .position(pinTo)
                        .hideDelay(3000)
                );
            }
        }

    }]
);