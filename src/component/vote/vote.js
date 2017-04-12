;(function(){

    'use strict';

    var app = angular.module("app");
    app.controller("vote",["$scope","$rootScope","$http","HOST","$state",
        function($scope,$rootScope,$http,HOST,$state){

            $scope.id = $state.params.id;
            $scope.shareDate = {
                title:"",
                content:"",
                imageUrl:"",
                url:""
            };

            $http.get(HOST+"/v1/vote/details",{
                params: {
                    id: $scope.id
                },
                headers: {
                    "Authorization": localStorage.getItem("voteToken")
                }
            }).then(function(res){

                console.log("获取活动详情：",res);
                $scope.detail = res.data.data;

                $scope.voteDetail = res.data.data;
                $scope.shareDate.title = res.data.data.title;
                $scope.shareDate.content = "我正在参加“"+res.data.data.title +"”活动，快来帮我投票吧！";
                $scope.shareDate.imageUrl = res.data.data.coverPhoto;
                $scope.shareDate.url = "http://tpl.2tai.net/vote.share.html?id="+res.data.data.id;

            }).catch(function(error){
                console.log(error);
            });


            $scope.share = function(){
                console.log($scope.shareDate);
                if(typeof h5 == "object"){
                    h5.showNativeShareDialog($scope.shareDate.title,$scope.shareDate.content,$scope.shareDate.imageUrl,$scope.shareDate.url);
                }else{
                    alert("无分享接口");
                }
            };

        }
    ]);


})();
