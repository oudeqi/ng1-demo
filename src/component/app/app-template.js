;(function(){

'use strict';

angular.module('appTemplate', []).run(['$templateCache', function($templateCache) {

  $templateCache.put('../index/index.html', '<div id="index"><div class="poster"><img src="./assets/image/poster.jpg" alt=""></div><div class="padd-cont"><h1 class="title">2017-百度云正在寻找最有范的百度封面代表人物</h1><div class="tip"><div class="over"></div><p class="p1"><i class="icon"></i> <span class="time">投票2017/3/25 22:00:00结束</span> <span class="status">（投票中）</span></p><p class="p2"><i class="icon"></i> <span class="status">投票已过截至时间</span></p></div><div class="table-cont"><table><tr><th>已报名</th><th>投票人次</th><th>访问量</th></tr><tr><td>45</td><td>568</td><td>6546</td></tr></table></div><div class="look-detail-btn"><a class="link"><i class="icon"></i> <span>点击查看活动说明及奖励</span></a></div><div class="search-btn"><div class="ipt"><i class="icon"></i> <input type="text" placeholder="请输入选手的姓名或编号"></div><div class="btn"><button type="button">搜索</button></div></div><ul class="player-list"><li><div class="inner"><div class="pic"><img src="./assets/image/head-pic.jpg" alt=""></div><p class="p1">林先靖 编号:001</p><p class="p2"><span>票数</span> <strong>1321</strong> <span>名次</span> <strong>1</strong></p><button class="give" type="button">投票成功</button></div></li><li><div class="inner"><div class="pic"><img src="./assets/image/head-pic.jpg" alt=""></div><p class="p1">林先靖 编号:001</p><p class="p2"><span>票数</span> <strong>1321</strong> <span>名次</span> <strong>2</strong></p><button class="notgive" type="button">投一票</button></div></li><li><div class="inner"><div class="pic"><img src="./assets/image/head-pic.jpg" alt=""></div><p class="p1">林先靖 编号:001</p><p class="p2"><span>票数</span> <strong>1321</strong> <span>名次</span> <strong>3</strong></p><button class="notgive" type="button">投一票</button></div></li><li><div class="inner"><div class="pic"><img src="./assets/image/head-pic.jpg" alt=""></div><p class="p1">林先靖 编号:001</p><p class="p2"><span>票数</span> <strong>1321</strong> <span>名次</span> <strong>4</strong></p><button class="notgive" type="button">投一票</button></div></li></ul><p class="load-more">加载中...</p></div></div>');

  $templateCache.put('../footer/footer.html', '<div id="footer"><div class="inner"><ul><li><a ui-sref="home.index" ui-sref-active="active"><i class="icon"></i> <span>首页</span></a></li><li><a ui-sref="home.ranking" ui-sref-active="active"><i class="icon"></i> <span>排名</span></a></li><li><a ui-sref="home.signup" ui-sref-active="active"><i class="icon"></i> <span>报名</span></a></li></ul></div></div>');

  $templateCache.put('../ranking/ranking.html', '<div id="ranking"><div class="padd-cont"><div class="look-detail-btn"><a class="link"><i class="icon"></i> <span>点击查看活动说明及奖励</span></a></div><div class="search-btn"><div class="ipt"><i class="icon"></i> <input type="text" placeholder="请输入选手的姓名或编号"></div><div class="btn"><button type="button">搜索</button></div></div><ul class="player-list"><li><div class="inner"><div class="pic"><img src="./assets/image/head-pic.jpg" alt=""></div><p class="p1">林先靖 编号:001</p><p class="p2"><span>票数</span> <strong>1321</strong> <span>名次</span> <strong>1</strong></p><button class="give" type="button">投票成功</button></div></li><li><div class="inner"><div class="pic"><img src="./assets/image/head-pic.jpg" alt=""></div><p class="p1">林先靖 编号:001</p><p class="p2"><span>票数</span> <strong>1321</strong> <span>名次</span> <strong>2</strong></p><button class="notgive" type="button">投一票</button></div></li><li><div class="inner"><div class="pic"><img src="./assets/image/head-pic.jpg" alt=""></div><p class="p1">林先靖 编号:001</p><p class="p2"><span>票数</span> <strong>1321</strong> <span>名次</span> <strong>3</strong></p><button class="notgive" type="button">投一票</button></div></li><li><div class="inner"><div class="pic"><img src="./assets/image/head-pic.jpg" alt=""></div><p class="p1">林先靖 编号:001</p><p class="p2"><span>票数</span> <strong>1321</strong> <span>名次</span> <strong>4</strong></p><button class="notgive" type="button">投一票</button></div></li></ul><p class="load-more">加载中...</p></div></div>');

  $templateCache.put('../signup/signup.html', '<div id="signup"><div class="poster"><img src="./assets/image/poster.jpg" alt=""></div><div class="time"><p><i class="icon"></i> <span>报名时间 2017/10/17-2017/12/12</span></p><p><i class="icon"></i> <span>投票时间 2017/10/17-2017/12/12</span></p></div><div class="padd-cont"><div class="form-group"><p class="form-label">*请上传参赛作品</p><ul class="pic-view-list"><li><div class="inner"><div class="content"><button type="button"></button> <img src="../../assets/image/head-pic.jpg" alt=""></div></div></li><li><div class="inner"><div class="content"><button type="button"></button> <img src="../../assets/image/head-pic.jpg" alt=""></div></div></li><li><div class="inner"><div class="content"><button type="button"></button> <img src="../../assets/image/head-pic.jpg" alt=""></div></div></li></ul><p class="form-tip">最多可上传3张，默认第一张为封面图片</p></div><div class="form-group"><p class="form-label">*姓名：</p><div class="form-ipt"><input type="text" placeholder="请输入参赛人姓名"></div></div><div class="form-group"><p class="form-label">*联系电话：</p><div class="form-ipt"><input type="text" placeholder="请输入联系电话"></div></div><div class="form-group"><p class="form-label">参赛宣言：</p><div class="form-ipt"><textarea name="name" rows="4" placeholder="请输入想说的话"></textarea></div></div><div class="form-group"><button class="form-btn" type="button">点击报名</button></div></div></div>');

  $templateCache.put('../warpper/warpper.html', '<div class="warpper"><div class="main"><ui-view></ui-view></div><div ng-include="\'../footer/footer.html\'"></div></div>');

}]);

})();