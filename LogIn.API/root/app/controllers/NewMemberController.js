(function () {

    'use strict';
    app.controller('newMemberController', ['$scope', '$location', 'LoginService', 'AuthenticationService', function ($scope, $location, loginService, authenticationService) {
        $scope.member = {
            "Email": "",
            "UserName": "",
            "Password": "",
            "ConfirmPassword": "",
            "FirstName": "",
            "LastName": ""
        };
        $scope.GoToLogin = function () {
            $location.path('/login');
        }
        $scope.confirm = function () {
            if ($scope.member.ConfirmPassword != $scope.member.Password)
                $scope.message = "Password Error";
            else
                $scope.message = "";

        }

        $scope.register = function (form) {
            
            if (form.$valid && $scope.member.Password == $scope.member.ConfirmPassword)
                loginService.register($scope.member).then(function (response) {
                    if (response == null)
                        $scope.success = "verifier votre boite mail pour valider votre compte";
                    else
                    {
                        if (response.modelState != undefined)
                            $scope.message = response.modelState.msg[0];
                        else
                            $scope.success = "verifier votre boite email pour valider votre compte";
                    }
                        
                });
        }
    }]);
})();