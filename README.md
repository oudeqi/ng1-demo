# ng1-demo

## 后台接口

/**
 * 发布投票活动
 * @method post
 * @param {object} votePost - 发布提交的数据
 * @return {object} putRes - 发布结果
 */
 var votePost = {
     title:"",//活动标题
     coverPhoto:"",//封面图片
     actProfile:"",//活动简介
     signUpRule:["报名需满足：限成年女性，大于18周岁","必须是本人真实照片"],//参选规则
     reward:[{
         grade:"一等奖",//等级
         number:1,//名额
         goods:"iphone7玫瑰金+100元话费"//物品
     }],
     signupStart:"",//报名开始时间
     signupEnd:"",//报名结束时间
     voteStart:"",//投票开始时间
     voteEnd:"",//投票结束时间
     voteMethod:"进入app，点击轮播图，选择自己支持的选手",//投票方式
     voteRule:["活动期间每位APP用户（指每一部手机）只能投1票，每个选手每天最多只能获取300票。"],//投票规则
     multiVote:0,//0 不能一票多投 1可以多投
     upperLimit:0,//选手每日被投票上限 0代表无上限
     orgMain:"",//主办单位
     orgSecondary:"",//协办单位
     undertaker:"",//承办单位
     originalLink:"",//原文链接
 };

 /**
  * 获取投票活动列表
  * @method get
  * @param {string} status - 0全部， 1未开始， 2进行中， 3已结束
  * @param {string} keywords - 搜索关键字
  * @param {int} pageIndex - 当前搜索页数
  * @param {int} pageSize - 每页条数
  * @return {object} acts - 活动列表
  */
 var acts = {
     msg:"",//返回附加消息
     pageIndex:1,//当前页
     pageSize:20,//每页条数
     totalItems:50,//总共条数
     list:[{//活动列表
         id:"1000",
         title:"天府三街谁最骚",//活动标题
         isSignupEnd:0,//0 报名没有结束，1报名结束
         isVoteEnd:0,//0 投票没有结束，1投票结束
         coverPhoto:"./img/treasure_eg.jpg",//封面图
         status:1,//1未开始 2进行中 3已结束
         joinNumber:50,//参选人数
     }],
 };

 /**
  * 获取选手列表
  * @method get
  * @param {string} id - 投票活动id
  * @param {string} status - 0全部， 1已经通过， 2未通过， 3取消资格
  * @param {string} keywords - 搜索关键字
  * @param {int} pageIndex - 当前搜索页数
  * @param {int} pageSize - 每页条数
  * @return {object} players - 选手列表
  */
  var players = {
      msg:"",//返回附加消息
      pageIndex:1,//当前页
      pageSize:20,//每页条数
      totalItems:50,//总共条数
      list:[{
          id:"200",
          seriaNumber:"2",//编号
          name:"老马",//参选者艺名
          declaration:"天府三街谁最骚？非老马莫属",//宣言
          phoneNo:"18981936871",
          photos:[{
              id:100,//图片id
              src:"./img/treasure_eg.jpg"//图片路径
          }],//头图
          status:2,//1已经通过， 2未通过， 3取消资格， 4再次通过的
          getVotes:20,//获得的票数
          ranking:3,//排名
      }],
  };

  /**
   * 获取选手详情
   * @method get
   * @params {string} id - 选手id
   * @return {object} detail - 选手详情
   */
   var detail = {
       msg:"",//返回附加消息
       id:"200",//选手id
       name:"灵仙镜",//选手名字
       seriaNumber:"2",//编号
       status:2,//1已经通过， 2未通过， 3取消资格， 4再次通过的
       getVotes:20,//获得的票数
       ranking:3,//排名
       totalVotes:50,//总票数
       declaration:"天府三街谁最骚？非老马莫属",//宣言
       photos:[{
           id:"1000",
           photo:"./img/treasure_eg.jpg",//封面图
       }],
       voteBaseline:0,//投票基数
       rejectionReason:"百度云正在寻找最有范的百度封面代表人物，快来帮忙投票吧！"//拒绝理由
   };

## 移动端接口

/**
 * 获取活动详情
 * @method get
 * @return voteRes - 活动详情
 */
var voteRes = {
    coverPhoto:"./assets/image/poster.jpg",//活动封面图
    title:"百度云正在寻找最有范的百度封面代表人物",//活动标题
    playerNumber:100,//已报名人数
    voteNumber:2000,//投票次数
    pageViewNumber:80000,//浏览量
    actProfile:"",//活动简介
    orgMain:"",//主办单位
    orgSecondary:"",//协办单位
    undertaker:"",//承办单位
    signupStart:"",//报名开始时间
    signupEnd:"",//报名结束时间
    isSignupEnd:0,//0 报名没有结束，1报名结束
    voteStart:"",//投票开始时间
    voteEnd:"",//投票结束时间
    isVoteEnd:0,//0 投票没有结束，1投票结束
    voteMethod:"进入app，点击轮播图，选择自己支持的选手",//投票方式
    reward:[{
        grade:"一等奖",//等级
        number:1,//名额
        goods:"iphone7玫瑰金+100元话费"//物品
    },{
        grade:"二等奖",
        number:2,
        goods:"iphone6土豪金+50元话费"
    },{
        grade:"三等奖",
        number:3,
        goods:"iphone5 64g +10元话费"
    }],
    electionRule:["报名需满足：限成年女性，大于18周岁","必须是本人真实照片"],//参选规则
    voteRule:["活动期间每位APP用户（指每一部手机）只能投1票，每个选手每天最多只能获取300票。"]//投票规则
};

/**
 * 参选者列表 按照报名时间排序
 * @method get
 * @param {string} keywords - 搜索关键字
 * @param {int} pageIndex - 当前搜索页数
 * @param {int} pageSize - 每页条数
 * @return {object} playerList - 选手列表
 */
 var playerList = {
     msg:"",//返回附加消息
     pageIndex:1,//当前页
     pageSize:20,//每页条数
     totalItems:50,//总共条数
     list:[{
         id:"200",
         seriaNumber:"2",//编号
         name:"老马",//参选者艺名
         declaration:"天府三街谁最骚？非老马莫属",//宣言
         phoneNo:"18981936871",
         photos:[{
             id:100,//图片id
             src:"./img/treasure_eg.jpg"//图片路径
         }],//头图
         status:2,//1已经通过， 2未通过， 3取消资格， 4再次通过的
         getVotes:20,//获得的票数
         ranking:3,//排名
         isVoted:1,//当前用户是否已投此选手
     }],
 };

 /**
  * 参选者排名 按照名次排序
  * @method get
  * @param {string} keywords - 搜索关键字
  * @param {int} pageIndex - 当前搜索页数
  * @param {int} pageSize - 每页条数
  * @return {object} players - 选手列表
  */
  var players = {
      msg:"",//返回附加消息
      pageIndex:1,//当前页
      pageSize:20,//每页条数
      totalItems:50,//总共条数
      list:[{
          id:"200",
          seriaNumber:"2",//编号
          name:"老马",//参选者艺名
          declaration:"天府三街谁最骚？非老马莫属",//宣言
          phoneNo:"18981936871",
          photos:[{
              id:100,//图片id
              src:"./img/treasure_eg.jpg"//图片路径
          }],//头图
          getVotes:20,//获得的票数
          ranking:3,//排名
          isVoted:1,//当前用户是否已投此选手
      }],
  };

  /**
   * 活动报名
   * @method post
   * @param {string} name - 参赛人姓名
   * @param {string} phoneNo - 参赛人联系电话
   * @param {string} declaration - 参赛人宣言
   * @param {array} photos - 参赛人相片["","",""]
   * @return {object} signupRes - 选手列表
   */
  var signupRes = {
      msg:"",//附加消息
      data:1,//1成功，0失败
  };

  /**
   * 获取选手详情
   * @method get
   * @param {int} id - 选手id
   * @return {object} playerDetail - 选手详情
   */
   var playerDetail = {
       msg:"",//返回附加消息
       id:"200",
       seriaNumber:"2",//编号
       name:"老马",//参选者艺名
       declaration:"天府三街谁最骚？非老马莫属",//宣言
       phoneNo:"18981936871",
       photos:[{
           id:100,//图片id
           src:"./img/treasure_eg.jpg"//图片路径
       }],//头图
       getVotes:20,//获得的票数
       ranking:3,//排名
       isVoted:1,//当前用户是否已投此选手
   };
