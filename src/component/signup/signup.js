;(function(){
    "use strict";
    var app = angular.module("app");
    app.controller("signup",["$scope","$rootScope","$http","HOST","$timeout","$state",
        function($scope,$rootScope,$http,HOST,$timeout,$state){

            $scope.id = localStorage.getItem("voteId");

            $http.get(HOST+"/v1/vote/details",{
                params: {
                    id: localStorage.getItem("voteId")
                },
                headers: {
                    "Authorization": localStorage.getItem("voteToken")
                }
            }).then(function(res){
                console.log("获取活动详情：",res);
                $scope.detail = res.data.data;
            }).catch(function(error){
                console.log(error);
            });

            $scope.pic0 = false;
            $scope.pic1 = false;
            $scope.pic2 = false;

            $scope.fileChange = function(_this,i){
                var content = _this.parentNode.parentNode.parentNode;
                var file = _this.files[0];
                if(!/image\/\w+/.test(file.type)){
                    return false;
                }
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload=function(e){
                    $scope.$apply(function(){
                        $scope["pic"+i] = true;
                    });
                    content.querySelector(".pic-view").innerHTML='<img src="' + e.target.result +'" alt="" />';
                };
            };

            $scope.delPic = function(i){
                var picView = document.querySelector("#signup").querySelectorAll(".pic-view")[i];
                picView.innerHTML = "";
                $timeout(function(){
                    $scope["pic"+i] = false;
                },0);
            };

            //报名
            $scope.postData = {
                voteSetId:localStorage.getItem("voteId"),
                name:"",
                phoneNo:"",
                declaration:"",
                base64Photos:[]
            };

            $scope.nameInvalid = false;
            $scope.phoneNoInvalid = false;

            $scope.checkName = function(){
                if(!!$scope.postData.name){
                    $scope.nameInvalid = false;
                }else{
                    $scope.nameInvalid = true;
                }
            };
            $scope.checkPhoneNo = function(){
                if(/^(0|[1-9][0-9]{10})$/.test($scope.postData.phoneNo)){
                    $scope.phoneNoInvalid = false;
                }else{
                    $scope.phoneNoInvalid = true;
                }
            };

            $scope.loading = 0;
            $scope.signUp = function(){
                if(!$scope.postData.name){
                    $scope.nameInvalid = true;
                    return false;
                }else{
                    $scope.nameInvalid = false;
                }
                if(!/^(0|[1-9][0-9]{10})$/.test($scope.postData.phoneNo)){
                    $scope.phoneNoInvalid = true;
                    return false;
                }else{
                    $scope.phoneNoInvalid = false;
                }
                var img1 = document.querySelector("#signup").querySelectorAll("img")[1];
                var img2 = document.querySelector("#signup").querySelectorAll("img")[2];
                var img3 = document.querySelector("#signup").querySelectorAll("img")[3];
                if(img1 && img2 && img3){
                    $scope.postData.base64Photos[0] = img1.getAttribute("src");
                    $scope.postData.base64Photos[1] = img2.getAttribute("src");
                    $scope.postData.base64Photos[2] = img3.getAttribute("src");
                }else{
                    return false;
                }
                console.log($scope.postData);
                if($scope.loading == 1){
                    return false;
                }
                $scope.loading = 1;
                $http.post(HOST+'/v1/aut/vote/player',{
                    voteSetId:$scope.postData.voteSetId,
                    name:$scope.postData.name,
                    phoneNo:$scope.postData.phoneNo,
                    declaration:$scope.postData.declaration,
                    base64Photos:$scope.postData.base64Photos,
                 },{
                    headers:{
                        'Authorization':localStorage.getItem("voteToken")
                    }
                }).then(function(res){
                    $scope.loading = 0;
                    console.log("报名：",res);
                    if(res.data.data){
                        $state.go("succ",{id:$scope.id},{reload:true});
                    }else{
                        alert(res.data.errMessage);
                    }
                }).catch(function(error){
                    $scope.loading = 0;
                    alert("请求失败");
                    console.log(error);
                });
            };
        }
    ]);


})();
