;(function(){

    'use strict';

    var app = angular.module("app");
    app.controller("player",["$scope","$rootScope","$http","HOST","$state","device",
        function($scope,$rootScope,$http,HOST,$state,device){

            $scope.id = $state.params.id;

            $scope.w = parseInt(device.screenW());

            var serialNo = "";
            var actTit = "";
            $scope.shareDate = {
                title:"",
                content:"",
                imageUrl:"",
                url:""
            };

            $http.get(HOST+"/v1/player/detail",{
                params: {
                    id: $scope.id
                },
                headers: {
                    "Authorization": localStorage.getItem("voteToken")
                }
            }).then(function(res){
                console.log("获取选手详情：",res);
                $scope.detail = res.data.data;
                serialNo = "我是 "+res.data.data.name+" "+res.data.data.seriaNumber+"号，";
            }).catch(function(error){
                console.log(error);
            });

            $http.get(HOST+"/v1/vote/details",{
                params: {
                    id: localStorage.getItem("voteId")
                },
                headers: {
                    "Authorization": localStorage.getItem("voteToken")
                }
            }).then(function(res){
                console.log("获取活动详情：",res);
                $scope.voteDetail = res.data.data;
                $scope.shareDate.title = res.data.data.title;
                actTit = "我正在参加“"+res.data.data.title +"”活动，快来帮我投票吧！";
                $scope.shareDate.imageUrl = res.data.data.coverPhoto;
                $scope.shareDate.url = "http://tpl.2tai.net/vote.share.html?id="+res.data.data.id;
            }).catch(function(error){
                console.log(error);
            });

            //分享
            $scope.share = function(){
                $scope.shareDate.content = serialNo + actTit;
                console.log($scope.shareDate);
                if(typeof h5 == "object"){
                    h5.showNativeShareDialog($scope.shareDate.title,$scope.shareDate.content,$scope.shareDate.imageUrl,$scope.shareDate.url);
                }else{
                    alert("无分享接口");
                }
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
                        item.votes++;
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
