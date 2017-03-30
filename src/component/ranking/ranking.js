;(function(){

    'use strict';

    var app = angular.module("app");
    app.controller("ranking",["$scope","$rootScope","$http","HOST",
        function($scope,$rootScope,$http,HOST){
            console.log(HOST);
            console.log(localStorage.getItem("voteId"));
            console.log(localStorage.getItem("voteToken"));

            $scope.id = localStorage.getItem("voteId");

            //type:1 最新，2，排名
            $scope.keywords = "";
            $scope.pageSize = 20;
            $scope.pageIndex = 1;
            $scope.pageCount = 0;
            $scope.list = [];
            $scope.loading = false;
            $scope.getList = function(){
                $scope.loading = true;
                $http.get(HOST+"/v1/player/list",{
                    params: {
                        id: localStorage.getItem("voteId"),
                        type: 1,
                        keywords:$scope.keywords,
                        pageSize:$scope.pageSize,
                        pageIndex:$scope.pageIndex
                    },
                    headers:{
         				'Authorization':localStorage.getItem("voteToken")
         			}
                }).then(function(res){
                    $scope.clicked = false;
                    $scope.loading = false;
                    console.log("获取参选者列表：",res);
                    if(res.data.data.data && typeof res.data.data.data === "object"){
                        angular.forEach(res.data.data.data,function(item){
                            $scope.list.push(item);
                        });
                        $scope.pageIndex = res.data.data.pageIndex+1;
                        $scope.pageCount = res.data.data.pageCount;
                        $scope.hasMore = res.data.data.pageIndex < res.data.data.pageCount;
                    }
                }).catch(function(error){
                    $scope.clicked = false;
                    $scope.loading = false;
                    console.log(error);
                });
            };
            $scope.getList();

            $scope.clicked = false;
            $scope.search = function(){
                if($scope.clicked){
                    return;
                }
                $scope.clicked = true;
                $scope.pageIndex = 1;
                $scope.list = [];
                $scope.getList();
            };

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
