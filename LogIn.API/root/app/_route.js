﻿var serviceBase = 'http://localhost:59822/';
//var serviceBase = 'http://loginwebapi.somee.com/';


var app = angular.module('MyApp', ['ngRoute', 'LocalStorageModule', 'vcRecaptcha']);

app.config(function ($routeProvider) {

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "/root/app/view/home.html"
    });


    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "/root/app/view/login.html"
    });
    $routeProvider.when("/NewMember", {
        controller: "newMemberController",
        templateUrl: "/root/app/view/addMember.html"
    });
    $routeProvider.when("/passPerdu", {
        controller: "passPerduController",
        templateUrl: "/root/app/view/getPass.html"
    });

    $routeProvider.when("/ResetPass", {
        controller: "ResetPassController",
        templateUrl: "/root/app/view/ResetPassword.html"
    });
    

    $routeProvider.otherwise({ redirectTo: "/login" });

})
    .config(['$httpProvider', function ($httpProvider) {

        $httpProvider.interceptors.push(function ($q, $rootScope, $window, $location) {

            return {
                request: function (config) {

                    return config;
                },
                requestError: function (rejection) {

                    return $q.reject(rejection);
                },
                response: function (response) {
                    if (response.status == "401") {
                        $location.path('/login');
                    }
                    //the same response/modified/or a new one need to be returned.
                    return response;
                },
                responseError: function (rejection) {

                    if (rejection.status == "401") {
                        $location.path('/login');
                    }
                    return $q.reject(rejection);
                }
            };
        });
    }]);