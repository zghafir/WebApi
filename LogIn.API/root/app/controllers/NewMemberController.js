(function () {

    'use strict';
    app.controller('NewMemberController', ['$scope','$location', 'AuthenticationService', function ($scope,$location, authenticationService) {
        
        $scope.GoToLogin = function () {
            $location.path('/login');
        }
    }]);
})();