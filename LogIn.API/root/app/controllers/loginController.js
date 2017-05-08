(function () {
    'use strict';
    app.controller('loginController', ['$scope', 'LoginService', '$location', function ($scope, loginService, $location) {

        $scope.loginData = {
            userName: "",
            password: ""
        };
        
        $scope.login = function (form) {
            if (form.$valid)
            loginService.login($scope.loginData.userName, $scope.loginData.password).then(function (response) {
                if (response != null && response.error != undefined) {
                    $scope.message = response.error_description;
                }
                else {
                    
                    $location.path('/home');
                }
            });
        }

        $scope.GoToNewMember = function () {
            $location.path('/NewMember');
        }

        $scope.GoTopass = function () {
            debugger;
            $location.path('/passPerdu');
        }



    }]);
})();