;(function(){

    'use strict';

    angular.module("app",[
        "app.router",
        "app.constant",
        "app.directive"
    ]);
    angular.module("app").run(["$rootScope", "$location",
        function($rootScope, $location) {

            var url = $location.$$absUrl,
                start = url.indexOf("?")+1,
                end = url.indexOf("#");
            if(end == -1){
                end = url.length;
            }
            var paramStr = url.substring(start,end),
                param = paramStr.split("&"),voteId,voteToken;

            for (var i = 0; i < param.length; i++) {
                var p = param[i].split("=");
                if(p[0] == "id"){
                    voteId = p[1];
                }
                if(p[0] == "token"){
                    voteToken = p[1];
                }
            }
            console.log("id+token:",voteId,voteToken);
            if(voteId){
                localStorage.setItem("voteId",voteId);
            }else{
                localStorage.setItem("voteId","");
            }
            if(voteToken){
                localStorage.setItem("voteToken",voteToken);
            }else{
                localStorage.setItem("voteToken","");
            }

            $rootScope.close = function(){
                console.log("close");
                if(typeof h5 == "object"){
                    h5.closeWebView();
                }
            };

            $rootScope.login = function(){
                console.log("login");
                if(typeof h5 == "object"){
                    h5.openLogin();
                }
            };
            
        }
    ]);
    angular.module("app.router",["ui.router","appTemplate"]);
    angular.module("app.directive",["appTemplate"]);
    angular.module("app.directive").directive('cleanFileValue',function(){
        return {
            restrict:'A',
            link:function(scope,elem,attrs){
                elem.bind("change",function(ev){
                    try{
                        ev.target.value = null;
                    }catch(err){
                        console.log(err);
                    }
                });
            }
        };
    });
    // angular.module("app.constant",[]).constant("HOST","http://192.168.10.30:8080");
    angular.module("app.constant",[]).constant("HOST","http://101.200.129.132");


})();
