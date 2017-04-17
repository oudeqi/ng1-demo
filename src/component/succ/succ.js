;(function(){

    'use strict';

    var app = angular.module("app");
    app.controller("succ",["$scope","$rootScope","$http","HOST","$state",
        function($scope,$rootScope,$http,HOST,$state){

            $scope.id = $state.params.id;
            console.log($scope.id);

            $http.get(HOST+"/v1/vote/details",{
                params: {
                    id: $scope.id
                },
                headers: {
                    'Authorization': localStorage.getItem("voteToken")
                }
            }).then(function(res){

                console.log("获取活动详情：",res);
                $scope.detail = res.data.data;

            }).catch(function(error){
                console.log(error);
            });

        }
    ]);


})();
