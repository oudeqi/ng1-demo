;(function(){

    'use strict';

    var app = angular.module("app");
    app.controller("ranking",["$scope","$rootScope","$http","HOST","device","$state","$timeout","toast",
        function($scope,$rootScope,$http,HOST,device,$state,$timeout,toast){

            $scope.w = parseInt(device.screenW());
            $scope.h = parseInt(device.screenW()*200/155);
            $scope.id = localStorage.getItem("voteId");

            $scope.$on("scroll", function(event,data) {
                if(window.innerHeight + document.body.scrollTop > document.querySelector("#ranking").offsetHeight - 2){
                    if($scope.loading == "0" || $scope.loading == "2"){
                        console.log("加载数据...");
                        $scope.getList();
                    }
                }
            });

            $http.get(HOST+"/v1/vote/details",{
                params: {
                    id: localStorage.getItem("voteId")
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

            $scope.voteDisabled = function(){
                toast.open("每天最多能投10人");
            };

            $scope.keywords = "";
            $scope.pageSize = 20;
            $scope.pageIndex = 1;
            $scope.list = [];
            $scope.loading = 0;//1，加载中 2，加载更多 3，加载完所有 4，历史加载中
            $scope.getList = function(){
                $scope.loading = 1;
                $http.get(HOST+"/v1/player/list",{
                    params: {
                        id: localStorage.getItem("voteId"),
                        type: 2,//type:1 最新，2，排名
                        keywords:$scope.keywords,
                        pageSize:$scope.pageSize,
                        pageIndex:$scope.pageIndex
                    },
                    headers:{
         				'Authorization':localStorage.getItem("voteToken")
         			}
                }).then(function(res){
                    $scope.clicked = false;
                    console.log("获取参选者排名：",res);
                    if(res.data.data.data && typeof res.data.data.data==="object"){
                        angular.forEach(res.data.data.data,function(item){
                            $scope.list.push(item);
                        });
                        if(res.data.data.pageCount == res.data.data.pageIndex){
                            $scope.loading = 3;
                        }else{
                            $scope.pageIndex = res.data.data.pageIndex + 1;
                            $scope.loading = 2;
                        }
                    }else{
                        $scope.loading = 0;
                    }
                }).catch(function(error){
                    $scope.clicked = false;
                    $scope.loading = 0;
                    console.log(error);
                });
            };

            var currentPage = localStorage.getItem("currentPage");
            var currentScrollTop = localStorage.getItem("currentScrollTop");
            var currentKeywords = localStorage.getItem("currentKeywords");
            console.log(currentPage,currentScrollTop,currentKeywords);
            if(currentPage && currentScrollTop){
                $scope.loading = 4;
                $http.get(HOST+"/v1/player/list",{
                    params: {
                        id: $scope.id,
                        type: 2,//type:1 最新，2，排名
                        keywords:currentKeywords,
                        pageSize:(parseInt(currentPage)-1)*$scope.pageSize,
                        pageIndex:1
                    },
                    headers:{
                        "Authorization":localStorage.getItem("voteToken")
                    }
                }).then(function(res){
                    console.log("获取参选者列表：",res);
                    localStorage.removeItem("currentPage");
                    localStorage.removeItem("currentScrollTop");
                    localStorage.removeItem("currentKeywords");
                    if(res.data.data.data && typeof res.data.data.data==="object"){
                        angular.forEach(res.data.data.data,function(item){
                            $scope.list.push(item);
                        });
                        $timeout(function(){
                            document.body.scrollTop = currentScrollTop;
                            if(res.data.data.pageCount == res.data.data.pageIndex){
                                $scope.loading = 3;
                            }else{
                                $scope.pageIndex = parseInt(currentPage);
                                $scope.loading = 2;
                            }
                        },300);
                    }else{
                        $scope.loading = 0;
                    }
                }).catch(function(error){
                    $scope.loading = 0;
                    localStorage.removeItem("currentPage");
                    localStorage.removeItem("currentScrollTop");
                    localStorage.removeItem("currentKeywords");
                    console.log(error);
                });
            }else{
                $scope.getList();
            }

            $scope.lookPlayer = function(id){
                localStorage.setItem("currentPage",$scope.pageIndex);
                localStorage.setItem("currentScrollTop",document.body.scrollTop);
                localStorage.setItem("currentKeywords",$scope.keywords);
                $state.go("player",{id:id},{reload:true});
            };

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

            function reloadData(){
                $scope.loading = 4;
                var scrollTop = document.body.scrollTop;
                $http.get(HOST+"/v1/player/list",{
                    params: {
                        id: $scope.id,
                        type: 2,//type:1 最新，2，排名
                        keywords:$scope.keywords,
                        pageSize:(parseInt($scope.pageIndex))*$scope.pageSize,
                        pageIndex:1
                    },
                    headers:{
                        "Authorization":localStorage.getItem("voteToken")
                    }
                }).then(function(res){
                    console.log("获取参选者列表：",res);
                    if(res.data.data.data && typeof res.data.data.data==="object"){
                        $scope.list = [];
                        angular.forEach(res.data.data.data,function(item){
                            $scope.list.push(item);
                        });
                        $timeout(function(){
                            document.body.scrollTop = scrollTop;
                            if(res.data.data.pageCount == res.data.data.pageIndex){
                                $scope.loading = 3;
                            }else{
                                $scope.pageIndex = $scope.pageIndex + 1;
                                $scope.loading = 2;
                            }
                        },300);
                    }else{
                        $scope.loading = 0;
                    }
                }).catch(function(error){
                    $scope.loading = 0;
                    console.log(error);
                });
            }

            // 投票
            $scope.vote = function(item){
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
                        reloadData();
                    }else{
                        alert(res.data.errMessage);
                    }
                }).catch(function(error){
                    console.log(error);
                });
            };
        }
    ]);


})();
