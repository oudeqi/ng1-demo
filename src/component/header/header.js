;(function(){
    "use strict";
    var app = angular.module("app.directive");
    app.directive("appHeader",function(){
        return {
            restrict:"E",
            replace:true,
            transclude:true,
            template:function(el,attrs){
                console.log(attrs);
                var tpl = '';
                tpl += '<div class="header">';
                tpl += '    <div class="inner">';
                tpl += '        <div class="btn-cont">';
                if(attrs.back === ""){
                    tpl += '<a href="javascript:history.go(-1);"><i class="icon icon-back"></i></a>';
                }else if(!!attrs.back){
                    tpl += '<a href="javascript:void(0);" ng-click="'+attrs.back+'"><i class="icon icon-back"></i></a>';
                }
                if(attrs.close){
                    tpl += '<a href="javascript:void(0);" ng-click="'+attrs.close+'"><i class="icon icon-back"></i></a>';
                }
                tpl += '        </div>';
                tpl += '        <h1 class="head-tit" ng-transclude></h1>';
                tpl += '        <div class="btn-cont cont-r">';
                if(attrs.more){
                    tpl += '<a href="javascript:void(0);" ng-click="'+attrs.more+'"><i class="icon icon-more"></i></a>';
                }
                tpl += '        </div>';
                tpl += '    </div>';
                tpl += '</div>';
                return tpl;
            }
        };
    });

    app.directive("appBack",function(){
        return {
            restrict:"E",
            replace:true,
            template:function(el,attrs){
                var tpl = '';
                tpl += '<a href="javascript:history.go(-1);" class="app-back" type="button">';
                tpl += '<i class="icon"></i>';
                tpl += '</a>';
                return tpl;
            }
        };
    });

})();
