'use strict';

app.controller('settingsController', ['$scope', '$state', '$stateParams', 'HTTP_CODES', 'envService',
    function ($scope, $state, $stateParams, HTTP_CODES, envService) {

        $scope.settings_panel = true;
        $scope.settings_navigation = true;

        $scope.showSettingsPanel = function (panel_name) {
            if(panel_name === 'account'){
                $scope.settings_panel = true;
                $scope.settings_navigation = false;
            }
        }

        $scope.settings = [
            {name: 'Wi-Fi', extraScreen: 'Wi-fi menu', icon: 'device:network-wifi', enabled: true},
            {name: 'Bluetooth', extraScreen: 'Bluetooth menu', icon: 'device:bluetooth', enabled: false},
        ];

        $scope.user = {
            sex: '1',
            email: 'summmmit44@gmail.com',
            first_name: 'Sumit',
            last_name: 'Singh',
            company: 'Google',
            address: '1600 Amphitheatre Pkwy',
            city: 'Mountain View',
            state: 'CA',
            biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
            postalCode: '94043'
        };
        $scope.countrys = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
        'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
        'WY').split(' ').map(function (country) {
            return {abbrev: country};
        });

        $scope.sizes = [
            "Home",
            "Work",
        ];
        $scope.toppings = [
            {category: 'meat', name: 'Pepperoni'},
            {category: 'meat', name: 'Sausage'},
            {category: 'meat', name: 'Ground Beef'},
            {category: 'meat', name: 'Bacon'},
            {category: 'veg', name: 'Mushrooms'},
            {category: 'veg', name: 'Onion'},
            {category: 'veg', name: 'Green Pepper'},
            {category: 'veg', name: 'Green Olives'}
        ];
        $scope.selectedToppings = [];
        $scope.printSelectedToppings = function printSelectedToppings() {
            // If there is more than one topping, we add an 'and' and an oxford
            // comma to be gramatically correct.
            if (this.selectedToppings.length > 1) {
                var lastTopping = ', and ' + this.selectedToppings.slice(-1)[0];
                return this.selectedToppings.slice(0, -1).join(', ') + lastTopping;
            }
            return this.selectedToppings.join('');
        };
        $scope.people = [
            { name: 'Janet Perkins', img: 'img/100-0.jpeg', newMessage: true },
            { name: 'Mary Johnson', img: 'img/100-1.jpeg', newMessage: false },
            { name: 'Peter Carlsson', img: 'img/100-2.jpeg', newMessage: false }
        ];
    }
]);