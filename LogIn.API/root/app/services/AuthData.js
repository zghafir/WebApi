'use strict';
app.factory('authData', [ function () {
    var authDataFactory = {};

    var _authentication = {
        IsAuthenticated: false,
        fullname: ""
    };
    authDataFactory.authenticationData = _authentication;

    return authDataFactory;
}]);