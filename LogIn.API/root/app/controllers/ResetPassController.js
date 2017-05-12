(function () {

    'use strict';
    app.controller('ResetPassController', ['$scope', '$location', 'LoginService', function ($scope, $location, loginService) {
        $scope.Reset = {
            "Email": "",
            "Password": "",
            "ConfirmPassword": "",
            "Code" : ""
        };
        $scope.GoToLogin = function () {
            $location.path('/login');
        }
        $scope.confirm = function () {
            if ($scope.Reset.ConfirmPassword != $scope.Reset.Password)
                $scope.message = "Password Error";
            else
                $scope.message = "";

        }

        var parseLocation = function (location) {
            var pairs = location.substring(1).split("&");
            var obj = {};
            var pair;
            var i;

            for (i in pairs) {
                if (pairs[i] === "") continue;

                pair = pairs[i].split("=");
                obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
            }

            return obj;
        };

        $scope.Reset.Code = parseLocation(window.location.search)['code'];

        $scope.Reset = function (form) {
            if (form.$valid && $scope.Reset.Password == $scope.Reset.ConfirmPassword) {
                loginService.Reset($scope.Reset).then(function (response) {
                    if (response == null)
                        $scope.success = "Password Modifier avec succees";
                    else {
                        if (response.modelState != undefined)
                            $scope.message = response.modelState.msg[0];
                        else
                            $scope.success = "Password Modifier avec succees";
                    }

                });
            }
        }


        
    }]);
})();