;(function(){

    'use strict';

    var app = angular.module("app");
    app.controller("player",["$scope","$rootScope","$http","HOST","$state",
        function($scope,$rootScope,$http,HOST,$state){

            console.log(HOST);
            console.log(localStorage.getItem("voteId"));
            console.log(localStorage.getItem("voteToken"));

            $scope.id = $state.params.id;
            console.log($scope.id);

            $http.get(HOST+"/v1/player/detail",{
                params: {
                    id: $scope.id
                },
                headers: {
                    'Authorization': localStorage.getItem("voteToken")
                }
            }).then(function(res){

                console.log("获取选手详情：",res);
                $scope.detail = res.data.data;

            }).catch(function(error){
                console.log(error);
            });


            // 投票
            $scope.vote = function(item){
                console.log(item);
                if(item.canVote == '0' || item.canVote == '2'){
                    return;
                }
                if(!localStorage.getItem("voteToken")){
                    $rootScope.login();
                    return;
                }
                $http.post(HOST+'/v1/aut/user/vote',{
                    playerId:item.id
                 },{
         			headers:{
         				'Authorization':localStorage.getItem("voteToken")
         			}
         		}).then(function(res){
                    console.log("投票：",res);
                    if(res.data.data){
                        item.canVote = 2;
                    }
                }).catch(function(error){
                    console.log(error);
                });
            };

        }
    ]);


})();
