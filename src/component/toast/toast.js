;(function(){
    "use strict";
    var app = angular.module("app.toast",[]);
    app.run(["$rootScope","toast","$timeout",function($rootScope,toast,$timeout){

        var dToast = document.createElement("div");
        dToast.className = "toast";
        dToast.style.display = 'none';
        var tpl = '<div class="inner">';
        tpl += '<p class="toast-contain" ng-click="closeToast()">{{toastDesc}}</p>';
        tpl += '</div>';
        dToast.innerHTML = tpl;
        document.body.appendChild(dToast);
        $rootScope.toastDesc = "这是描述";
        $rootScope.closeToast = function(){
            dToast.style.display = 'none';
        };
        $rootScope.$on("toastchange",function(e,data){
            if(data.toastShow){
                dToast.style.display = 'block';
                $rootScope.toastDesc = data.toastDesc;
            }else{
                dToast.style.display = 'none';
                $rootScope.toastDesc = "这是描述";
            }
        });
    }]);

    app.factory("toast",["$rootScope","$timeout",function($rootScope,$timeout){
        var timer = null;
        var toastShow = false;
        var toastDesc = "这是描述";
        return {
            open:function(str){
                $rootScope.$emit("toastchange",{
                    toastShow: !toastShow,
                    toastDesc: str || toastDesc
                });
                toastDesc = str;
                if(timer){
                    $timeout.cancel(timer);
                    timer = null;
                }
                timer = $timeout(function(){
                    this.close();
                }.bind(this),1500);
            },
            close:function(){
                $rootScope.$emit("toastchange",{
                    toastShow: toastShow
                });
                $timeout.cancel(timer);
                timer = null;
            }
        };
    }]);
})();
