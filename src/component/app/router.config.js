;(function(){
    'use strict';
    angular.module("app.router").config(["$stateProvider","$urlRouterProvider",
        function($stateProvider,$urlRouterProvider) {
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
            $stateProvider.state({
                name: "vote",
                url: "/vote/:id",
                templateUrl: "../vote/vote.html"
            });
            $stateProvider.state({
                name: "player",
                url: "/player/:id",
                templateUrl: "../player/player.html"
            });
            $stateProvider.state({
                name: "succ",
                url: "/succ/:id",
                templateUrl: "../succ/succ.html"
            });
        }
    ]);

})();
