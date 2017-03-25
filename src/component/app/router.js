;(function(){
    'use strict';
    var app = angular.module("router", ["ui.router","appTemplate"]);
    app.config(function($stateProvider,$urlRouterProvider) {
        $urlRouterProvider.otherwise("/home/index");
        $stateProvider.state({
            name: "home",
            url: "/home",
            templateUrl: "../warpper/warpper.html"
        });
        $stateProvider.state({
            name: "home.index",
            url: "/index",
            templateUrl: "../index/index.html"
        });
        $stateProvider.state({
            name: "home.ranking",
            url: "/ranking",
            templateUrl: "../ranking/ranking.html"
        });
        $stateProvider.state({
            name: "home.signup",
            url: "/signup",
            templateUrl: "../signup/signup.html"
        });

    });
})();
