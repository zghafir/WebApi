(function () {
    'use strict';
    app.service('LoginService', ['$http', '$q', 'AuthenticationService', 'authData',
    function ($http, $q, authenticationService, authData) {
        var userInfo;
        var loginServiceURL = serviceBase;
        var deviceInfo = [];
        var deferred;

        this.login = function (userName, password) {
            deferred = $q.defer();
            var data = "grant_type=password&username=" + userName + "&password=" + password;
            $http.post(loginServiceURL + "oauth/token", data, {
                headers:
                   { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
            }).success(function (response) {
                userInfo = {
                    accessToken: response.access_token,
                    FirstName: response.FirstName,
                    LastName: response.LastName
                };
                authenticationService.setTokenInfo(userInfo);
                authData.authenticationData.IsAuthenticated = true;
                authData.authenticationData.fullname = response.FirstName + " " + response.LastName;
                deferred.resolve(null);
            })
            .error(function (err, status) {
                authData.authenticationData.IsAuthenticated = false;
                authData.authenticationData.fullname = "";
                deferred.resolve(err);
            });
            return deferred.promise;
        }

        this.logOut = function () {
            authenticationService.removeToken();
            authData.authenticationData.IsAuthenticated = false;
            authData.authenticationData.fullname = "";
        }

        this.register = function (member) {
            debugger;
            deferred = $q.defer();
            var data = member;
            $http.post(loginServiceURL + "api/accounts/create", data, {
                headers:
                   { 'Content-Type': 'application/json'}
            }).success(function (response) {
                
                deferred.resolve(null);
            })
            .error(function (err, status) {
                deferred.resolve(err);
            });
            return deferred.promise;
        }

        this.passperd = function (member) {
            debugger;
            deferred = $q.defer();
            var data = member;
            $http.post(loginServiceURL + "api/accounts/passPerdu", data, {
                headers:
                   { 'Content-Type': 'application/json' }
            }).success(function (response) {

                deferred.resolve(null);
            })
            .error(function (err, status) {
                deferred.resolve(err);
            });
            return deferred.promise;
        }

        this.Reset = function (object) {
            debugger;
            deferred = $q.defer();
            var data = object;
            $http.post(loginServiceURL + "api/accounts/ResetPassword", data, {
                headers:
                   { 'Content-Type': 'application/json' }
            }).success(function (response) {

                deferred.resolve(null);
            })
            .error(function (err, status) {
                deferred.resolve(err);
            });
            return deferred.promise;
        }

        

        
    }
    ]);
})();