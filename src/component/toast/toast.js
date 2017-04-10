;(function(){
    "use strict";
    var app = angular.module("app.toast",[]);
    app.run(["$rootScope","toast","$timeout",function($rootScope,toast,$timeout){

        var dToast = document.createElement("div");
        dToast.className = "toast";
        dToast.setAttribute("ng-show","toastShow");
        var tpl = '<div class="inner">';
        tpl += '<p class="toast-contain" ng-click="closeToast()">{{toastDesc}}</p>';
        tpl += '</div>';
        dToast.innerHTML = tpl;
        document.body.appendChild(dToast);
        $rootScope.toastShow = false;
        $rootScope.toastDesc = "这是描述";
        $rootScope.closeToast = function(){
            $rootScope.toastShow = false;
        };
    }]);

    app.factory("toast",["$rootScope","$timeout",function($rootScope,$timeout){
        var timer = null;
        return {
            open:function(str){
                $rootScope.toastShow = true;
                $rootScope.toastDesc = str;
                if(timer){
                    $timeout.cancel(timer);
                    timer = null;
                }
                timer = $timeout(function(){
                    this.close();
                }.bind(this),1500);
            },
            close:function(){
                $rootScope.toastShow = false;
                $timeout.cancel(timer);
                timer = null;
            }
        };
    }]);
})();
