(function () {

    'use strict';
    app.controller('passPerduController', ['$scope', '$location', 'LoginService', 'AuthenticationService', function ($scope, $location, loginService, authenticationService) {
        
        $scope.GoTologin = function () {
            $location.path('/login');
        }
        $scope.pass = {
            "Email": ""
        };

        $scope.getpass = function (form) {

            if (form.$valid)
                loginService.getpass($scope.pass).then(function (response) {
                    debugger;
                    if (response != null)
                        $scope.success = "verifier votre boite mail pour recuperer votre mot de pass";
                    else {
                        if (response.modelState != undefined)
                            $scope.message = response.modelState.msg[0];
                        else
                            $scope.success = "verifier votre boite mail pour recuperer votre mot de pass";
                    }

                });
        }
    }]);
})();