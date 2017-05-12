(function () {

    'use strict';
    app.controller('passPerduController', ['$scope', '$location', 'LoginService', 'vcRecaptchaService',
        function ($scope, $location, loginService, vcRecaptchaService) {
            debugger;
            var vm = this;
            vm.publicKey = "";
            
            vm.Response_available = '';


        $scope.response = null;
        $scope.widgetId = null;

        $scope.model = {
            key : '6LeJcCAUAAAAAOibhC-9YkpZIbbjKtmx2G-XXyln',
            Email : ''
        };

        $scope.setResponse = function (response) {
            vm.Response_available = response;
        };

        $scope.setWidgetId = function (widgetId) {
            $scope.widgetId = widgetId;
        };

        $scope.cbExpiration = function () {
            vcRecaptchaService.reload($scope.widgetId);
            $scope.response = null;
        };

        $scope.getPass = function () {
            debugger;
            if (vm.Response_available != '' && $scope.model.Email != '') {
                var obj = {
                    "Email": $scope.model.Email,
                    "Code" : vm.Response_available
                }
                loginService.passperd(obj).then(function (response) {
                    if (response == null)
                        $scope.success = "verifier votre boite mail pour Modifier votre mot de passe";
                    else {
                        if (response.modelState != undefined)
                            $scope.message = response.modelState.msg[0];
                        else
                            $scope.success = "verifier votre boite mail pour Modifier votre mot de passe";
                    }

                });



            }else {
                vcRecaptchaService.reload($scope.widgetId);
            }
        };
    }]);
})();