(function () {
'use strict';
app.controller('homeController', ['$scope', 'authData', function ($scope, authData) {
    $scope.user = authData.authenticationData.fullname;

}]);
})();