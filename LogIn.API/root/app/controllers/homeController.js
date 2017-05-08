(function () {
'use strict';
    app.controller('homeController', ['$scope','$location','LoginService', 'authData', function ($scope , $location,loginService, authData) {

        
    init();
    function init() {
        $scope.IsAuthenticated = false;
        if (authData.authenticationData.IsAuthenticated == true) {
            $scope.texto = "Bienvenue Mr " + authData.authenticationData.fullname;
            $scope.IsAuthenticated = true;
        }
        else 
            $scope.texto = "vous n'etes pas autorisé !!";
            
        
            
    }

    $scope.logout = function () {
        loginService.logOut();
        $location.path('/login');
    }


    $scope.login = function () {
        $location.path('/login');
    }

}]);
})();