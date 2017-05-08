(function () {

    'use strict';
    app.controller('passPerduController', ['$scope', '$location', 'LoginService', 'AuthenticationService', 'vcRecaptchaService',
        function ($scope, $location, loginService, authenticationService, vcRecaptchaService) {
            var vm = this;
            vm.publicKey = "6LeJcCAUAAAAAOibhC-9YkpZIbbjKtmx2G-XXyln";
            


        $scope.GoTologin = function () {
            $location.path('/login');
        }
        
        
        $scope.getpass = function (form) {
            var data = vcRecaptchaService.getResponse();
            debugger;
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