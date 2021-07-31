var app = angular.module('starter', ['ionic','starter.services','ngResource']);

app.run(function($ionicPlatform,$state) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

   //$state.go('dash');


  });
});
app.config(function($httpProvider) {
  //启用跨域Cookie传输
  $httpProvider.defaults.withCredentials = true;
});
app.config(function ($ionicConfigProvider,$httpProvider) {

  //设置导航返回按钮样式
  $ionicConfigProvider.backButton.text("");
  $ionicConfigProvider.backButton.previousTitleText(false);
  $ionicConfigProvider.backButton.icon("ion-ios-arrow-back");
  //启用跨域Cookie传输
  $httpProvider.defaults.withCredentials = true;

});

app.factory('sessionInjector', ["$rootScope",function($rootScope) {
    var sessionInjector = {
      response: function(response) {
        if(Object.prototype.toString.call(response.data) === "[object Object]" && response.data.Result && response.data.Result.iRsult == 2990){
          // weui.alert((response.data.Result.cRsultInfo));
          //window.location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx49d1e71dc1917ed5&redirect_uri=http://wxm.cniec.net/WX&response_type=code&scope=snsapi_userinfo&state=wx49d1e71dc1917ed5#wechat_redirect')
          //测试
          window.location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx49d1e71dc1917ed5&redirect_uri=http://weixin.aolian.biz/WX&response_type=code&scope=snsapi_userinfo&state=wx49d1e71dc1917ed5#wechat_redirect')
          //正式
          // window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1616729c5e8ff591&redirect_uri={http://dzjgsw.dezhou.gov.cn/WX&response_type=code&scope=snsapi_userinfo&state=123&connect_redirect=1#wechat_redirect`;
          return false;
        }
        return response;
      },
      request: function(config) {
        return config;
      }
    };
    return sessionInjector;
  }])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('sessionInjector');
  }])



//过滤时间显示
app.filter("dateToStr", function ($filter) {
    return function (input) {
      var now = Date.parse(new Date());
      var num = now - input;
      var minute = parseInt(num / 1000 / 60);
      if(minute<1){
        return "现在";
      }else if(minute < 60){
        return minute + "分钟前";
      }else if(minute / 60 < 24){
        return parseInt(minute / 60) + "小时前";

      }else if(minute / 60 / 24 < 30){
        return parseInt(minute / 60 / 24) + "天前";
      }else{
        // return parseInt(minute / 60 / 24) + "天前";
        return $filter('date')(input,"MM-dd HH:mm");
      }
    }
});

//是否点过赞
app.filter("isClick", function () {
    return function (input,code) {
      if(input && input.indexOf(code) != -1){
        return "isClick";
      }else{
        return "";
      }
    }
});


//禁用评论发送按钮
app.filter("sendBtnStatus", function () {
    return function (input) {
      if(input){
        return "";
      }else{
        return "disabled";
      }
    }
});

//显示多少条评论
app.filter("showCommentLength",function(){
  return function(arr,length,status){
    var output = [];
    if(status || length < 3){
      output=arr;
    }else{
      for (var i = 0; i < 3; i++){
        output.push(arr[i]);
      }
    }
    return output;
  }
})

// 报修列表
app.directive('repairList',function () {
    return {
      restrict: 'EA',
      scope: {
        item:'=',
      },
      replace: true,
      template: '\<div class="weui-panel__bd">\
        <div class="weui-media-box weui-media-box_text">\
          <div class="con-more" ng-if="item.isMore"><span>报修区域</span>：{{item.cRepairRegionName}}</div>\
          <div class="more-item"><span>报修地址</span>：{{item.cRepairAddress}}</div>\
          <div class="con-more" ng-if="item.isMore">\
            <div class="more-item"><span>报修类别：</span>{{item.cRepairCategoryName}}</div>\
            <div class="more-item"><span>是否公共区域</span>：{{item.cPublicTerritory ? \'是\':\'否\'}}</div>\
            <div class="more-item"><span>联系电话</span>：{{item.cContactNumber}}</div>\
            <div class="more-item content {{item.isMore?\'normal\':\'ellipsis\'}}"><span>故障描述</span>：{{item.cFaultDescription}}</div>\
            \
            <div class="more-item" ng-if="item.iStatus"><span>确认状态</span>：{{item.cVerifyName + " 于"}}&nbsp;&nbsp;{{item.dVerifyTime | date:"yyyy-MM-dd HH:mm"}}&nbsp;&nbsp;确认通过</div>\
            <div class="more-item" ng-if="!item.iStatus"><span>确认状态</span>：未确认</div>\
            <div class="more-item" ng-if="item.cConfirmemo"><span>确认备注</span>：{{item.cConfirmemo}}</div>\
            \
            <div class="more-item" ng-if="item.iStatus && item.iReceive"><span>派工状态</span>：{{item.cReceiveName + " 于"}}&nbsp;&nbsp;{{item.cReceiveTime | date:"yyyy-MM-dd HH:mm"}}&nbsp;&nbsp;已派工</div>\
            <div class="more-item" ng-if="item.iStatus && !item.iReceive"><span>派工状态</span>：待派工</div>\
            \
            <div class="more-item" ng-if="item.iStatus && item.iReceive && item.iInspect"><span>维修状态</span>：{{item.cPersonWork + " 于"}}&nbsp;&nbsp;{{item.dInspectTime | date:"yyyy-MM-dd HH:mm"}}&nbsp;&nbsp;维修完成</div>\
            <div class="more-item" ng-if="item.iStatus && item.iReceive && !item.iInspect"><span>维修状态</span>：{{item.cPersonWork}}&nbsp;&nbsp;维修中</div>\
            \
            <div class="more-item" ng-if="item.iStatus && item.iReceive && item.iCheck"><span>验收状态</span>：{{item.cCheckName + " 于"}}&nbsp;&nbsp;{{item.dCheckTime | date:"yyyy-MM-dd HH:mm"}}&nbsp;&nbsp;已验收</div>\
            <div class="more-item" ng-if="item.cVerifyemo"><span>验收备注</span>：{{item.cVerifyemo}}</div>\
            \
            <div class="more-item" ng-if="item.iStatus && item.iReceive && !item.iCheck"><span>验收状态</span>：未验收</div>\
            \
          </div>\
          <div  ng-if="!item.isMore" class="more-item content {{item.isMore?\'normal\':\'ellipsis\'}}"><span>故障描述</span>：{{item.cFaultDescription}}</div>\
          \
          <div class="imgs" ng-if="item.cScenepath.length">\
            <div class="img" ng-repeat="img in item.cScenepath | limitTo : 3 track by $index" style="background-image:url(\'{{img}}\');" ng-click="viewImg($index,item.cScenepath)"></div>\
            <div class="img no"></div>\
            <div class="img no"></div>\
            <div class="img no"></div>\
          </div>\
          <div class="con-more" ng-if="item.isMore && (item.cEmoRepair || item.cQuality)">\
            <div class="more-item"><span>用户评价</span>：{{item.cEmoRepair}}</div>\
            <div class="more-item"><span>维修质量</span>：<i class="fa fa-{{item.cQuality==1 ? \'smile-o\' : item.cQuality==2 ?  \'meh-o\':\'frown-o\'}}"></i>&nbsp;&nbsp;{{item.cQuality==1 ? \'满意\' : item.cQuality==2 ?  \'一般\':\'失望\'}}</div>\
            <div class="more-item"><span>维修效率</span>：<i class="fa fa-{{item.cEfficiency==1 ? \'smile-o\' : item.cEfficiency==2 ?  \'meh-o\':\'frown-o\'}}"></i>&nbsp;&nbsp;{{item.cEfficiency==1 ? \'满意\' : item.cEfficiency==2 ?  \'一般\':\'失望\'}}</div>\
            <div class="more-item"><span>服务态度</span>：<i class="fa fa-{{item.cService==1 ? \'smile-o\' : item.cService==2 ?  \'meh-o\':\'frown-o\'}}"></i>&nbsp;&nbsp;{{item.cService==1 ? \'满意\' : item.cService==2 ?  \'一般\':\'失望\'}}</div>\
            <div class="imgs" ng-if="item.cEmoRepairPath.length">\
              <div class="img" ng-repeat="img in item.cEmoRepairPath | limitTo : 3 track by $index" style="background-image:url(\'{{img}}\');" ng-click="viewImg($index,item.cEmoRepairPath)"></div>\
              <div class="img no"></div>\
              <div class="img no"></div>\
              <div class="img no"></div>\
            </div>\
          </div>\
          <div class="more-item" ng-if="item.isMore && !item.itemDtos.length"><span>维修耗材</span>：无</div>\
          <div class="more-item" ng-if="item.isMore && item.itemDtos.length"><span>维修耗材</span>：</div>\
          <table ng-if="item.isMore && item.itemDtos.length">\
            <thead><tr><th>耗材名称</th><th>规格型号</th><th>数量</th><th>单位</th></tr></thead>\
            <tbody>\
            <tr ng-repeat="hc in item.itemDtos track by $index">\
              <td>{{hc.cConsumablesName}}</td>\
              <td>{{hc.cPrice}}</td>\
              <td>{{hc.cNumber}}</td>\
              <td>{{hc.cUnit}}</td>\
            </tr>\
            </tbody>\
          </table>\
          <div class="con-foot">\
            <div class="con-l">\
              <div class="con-item time" ng-if="!item.isMore">{{item.dRepairDate | dateToStr}}</div>\
              <div class="con-item time" ng-if="item.isMore">{{item.dRepairDate | date:"MM-dd HH:mm"}}</div>\
            </div>\
            <div class="con-r">\
              <div class="con-item" ng-if="item.isMore">{{item.cRepairUnit}}</div>\
              <div class="con-item name">{{item.cLinkman}}</div>\
            </div>\
          </div>\
        </div>\
      </div>',
      controller: function ($scope) {
        //图片查看大图
        $scope.viewImg = function(index,items){
          wx.previewImage({
            current: items[index], // 当前显示图片的http链接
            urls: items // 需要预览的图片http链接列表
          });
        }

      }
    }
  })

//订餐管理
app.directive('dinnerItem',function () {
    return {
      restrict: 'EA',
      scope: {
        item:'=',
      },
      replace: true,
      template: '\<div class="weui-panel__bd">\
            <div class="angleStatus {{item.iState == 1 ? \'\':\'danger\'}}" ng-if="item.iState && !item.iComplete">{{item.iState == 1?"通过":item.iState == 2 ? "驳回" :"已取消"}}</div>\
            <div class="weui-media-box weui-media-box_text">\
              <div class="con-more" ng-if="item.isMore">\
                <div class="more-item"><span>预订单位</span>：{{item.cPredOrgName}}</div>\
                <div class="more-item"><span>预订人</span>：{{item.cSubscribePerson}}　　{{item.dCreatDate|date:\'yyyy-MM-dd  HH:mm\'}}</div>\
                <div class="more-item"><span>联系电话</span>：{{item.cSubscribePhone}}</div>\
                <div class="more-item"><span>预定单间</span>：{{item.cDishName}}</div>\
                <div class="more-item"><span>订餐日期</span>：{{item.cOrderTime|date:\'yyyy-MM-dd\'}}</div>\
                <div class="more-item"><span>订餐时段</span>：{{item.dAdvanceDate}}</div>\
                <div class="more-item"><span>就餐时间</span>：{{item.cRepast}}</div>\
                <div class="more-item" ng-if="item.cStandard==1"><span>用餐类型</span>：标准餐</div>\
                <div class="more-item" ng-if="item.cStandard==2"><span>用餐类型</span>：火锅餐</div>\
                <div class="more-item" ng-if="item.cStandardCode==1"><span>用餐标准</span>：¥30标准</div>\
                <div class="more-item" ng-if="item.cStandardCode==2"><span>用餐标准</span>：¥40标准</div>\
                <div class="more-item" ng-if="item.cStandardCode==3"><span>用餐标准</span>：其他标准</div>\
                <div class="more-item" ng-if="item.cStandardCode==3"><span>其他描述</span>：{{item.cRemarks}}</div>\
                <div class="more-item"><span>忌口</span>：{{item.cTaboo?item.cTabooTile:"无"}}</div>\
                <div class="more-item"><span>司机餐</span>：{{item.cDriver?item.cDriverTile:"无"}}</div>\
                <div class="more-item"><span>其他要求</span>：{{item.cRequirement ? item.cRequirement :\'无\'}}</div>\
                \
                <div class="more-item" ng-if="item.iState && item.iState != 3"><span>审核状态</span>：{{item.cExamineName + " 于"}}&nbsp;&nbsp;{{item.cExamineDate | date:"yyyy-MM-dd HH:mm"}}&nbsp;&nbsp;审核{{item.iState == 1 ? "通过":"驳回"}}</div>\
                <div class="more-item" ng-if="item.iState && item.iState != 3 && !item.iComplete"><span>{{item.iState == 1?"审批":"驳回"}}意见：</span>{{item.cStateText ? item.cStateText :\'无\'}}</div>\
              </div>\
              <div class="con-more" ng-if="item.isMore && item.cFood">\
                <div class="more-item"><span>用户评价</span>：{{item.cEvaluate}}</div>\
                <div class="more-item"><span>菜品质量</span>：<i class="fa fa-{{item.cFood==1 ? \'smile-o\' : item.cFood==2 ?  \'meh-o\':\'frown-o\'}}"></i>&nbsp;&nbsp;{{item.cFood==1 ? \'满意\' : item.cFood==2 ?  \'一般\':\'失望\'}}</div>\
                <div class="more-item"><span>餐厅环境</span>：<i class="fa fa-{{item.cRing==1 ? \'smile-o\' : item.cRing==2 ?  \'meh-o\':\'frown-o\'}}"></i>&nbsp;&nbsp;{{item.cRing==1 ? \'满意\' : item.cRing==2 ?  \'一般\':\'失望\'}}</div>\
                <div class="more-item"><span>服务质量</span>：<i class="fa fa-{{item.cQuality==1 ? \'smile-o\' : item.cQuality==2 ?  \'meh-o\':\'frown-o\'}}"></i>&nbsp;&nbsp;{{item.cQuality==1 ? \'满意\' : item.cQuality==2 ?  \'一般\':\'失望\'}}</div>\
                <div class="imgs" ng-if="item.cPath.length">\
                  <div class="img" ng-repeat="img in item.cPath | limitTo : 3 track by $index" style="background-image:url(\'{{img}}\');" ng-click="viewImg($index,item.cPath)"></div>\
                  <div class="img no"></div>\
                  <div class="img no"></div>\
                  <div class="img no"></div>\
                </div>\
              </div>\
              <div ng-if="!item.isMore">\
                <p class="content">预定单间：{{item.cDishName}}</p>\
                <p class="content {{item.isMore?\'normal\':\'ellipsis\'}}">就餐时间:{{item.cRepast}}<span style="float: right">用餐人数:{{item.cPeopleNum}}人</span></p>\
\
                <p class="content {{item.isMore?\'normal\':\'ellipsis\'}}">订餐时间:{{item.dCreatDate|date:\'yyyy-MM-dd  HH:mm\'}}\
                  <span style="float: right" ng-if="item.cStandard==1">\
                  用餐类型:标准餐\
                </span>\
                  <span style="float: right" ng-if="item.cStandard==2">\
                  用餐类型:火锅餐\
                </span>\
                </p>\
              </div>\
\
              <div class="con-foot">\
                <div class="con-l">\
                  <div class="con-item time" ng-if="!item.isMore">{{item.dRepairDate | dateToStr}}</div>\
                  <div class="con-item time" ng-if="item.isMore">{{item.dRepairDate | date:"MM-dd HH:ss"}}</div>\
                </div>\
                <div class="con-r">\
                  <div class="con-item" ng-if="item.isMore">{{item.cRepairUnit}}</div>\
                  <div class="con-item name">{{item.cLinkman}}</div>\
                </div>\
              </div>\
            </div>\
          </div>',
      controller: function ($scope) {
        //图片查看大图
        $scope.viewImg = function(index,items){
          wx.previewImage({
            current: items[index], // 当前显示图片的http链接
            urls: items // 需要预览的图片http链接列表
          });
        }
      }
    }
  })

// 点赞吐槽建议
app.directive('gbook',function () {
    return {
      restrict: 'E',
      scope: {
        action:'=',
        title:'='
      },
      templateUrl: './modules/thumbsUp/gbookTemplate.html',
      controller: [
      "$compile","$element","$scope","$ionicPopover","$state","$ionicSideMenuDelegate","$ionicPopup","LocalStore","$resource","serverUrl","$ionicModal",
      function ($compile,$element,$scope,$ionicPopover,$state,$ionicSideMenuDelegate,$ionicPopup,LocalStore,$resource,serverUrl,$ionicModal) {
        switch ($scope.action){
          case 1:
            $scope.title = "点赞";
            break;
          case 2:
            $scope.title = "吐槽";
            break;
          case 3:
            $scope.title = "建议";
            break;
          default:
            $scope.title = "留言";
            break;
        }
        // 服务器地址
        if(LocalStore.get('serverUrl'))
        {
          serverUrl = LocalStore.get('serverUrl');
        }

        var menus=LocalStore.getObject('Meuns');
        $scope.currentPerson = {
          name:menus.cPersonName,
          code:menus.cPersonCode
        }

        // console.log($scope.currentPerson)

        // 留言广场列表 /Microinformation/getTopNObjCode/{cSpeakTypeCode}
        // 获取列表/Microinformation/getTopNObj/{cSpeakTypeCode}/{cPersonUUID}
        // cSpeakTypeCode传1  就是查询点赞  传2 就是查询吐槽  传3 就是查询建议
        // cPersonUUID:人员UUID     返回值 list
        var gbookAllList = [],gbookUserList=[];
        var getUserList = function(){
          $resource(serverUrl + '/Microinformation/getTopNObjCode/:cSpeakTypeCode' )
          .get({cSpeakTypeCode:$scope.action},function (res) {
              if(res.Result.iRsult == 1){
                for (var i = 0;i < res.list.length; i++){
                  if(res.list[i].cComment){
                    // console.log(i);
                    res.list[i].cComment = JSON.parse(res.list[i].cComment);
                    // console.log(res.list[i].cComment);
                  }else{
                    res.list[i].cComment= [];
                  }
                  if(res.list[i].cPicturePath){
                    res.list[i].cPicturePath = res.list[i].cPicturePath.split(",");
                  }
                }
                gbookAllList=res.list;
                $scope.gbookList = gbookAllList;
              }
            }
          );
        }
        
        var getAllList = function(){
          $resource(serverUrl + '/Microinformation/getTopNObj/:cSpeakTypeCode/:cPersonUUID' )
            .get({cSpeakTypeCode:$scope.action,cPersonUUID:menus.cPersonUUID},function (res) {
                if(res.Result.iRsult == 1){
                  for (var i = 0;i < res.list.length; i++){
                    if(res.list[i].cComment){
                      // console.log(i);
                      res.list[i].cComment = JSON.parse(res.list[i].cComment);
                      // console.log(res.list[i].cComment);
                    }else{
                      res.list[i].cComment= [];
                    }
                    if(res.list[i].cPicturePath){
                      res.list[i].cPicturePath = res.list[i].cPicturePath.split(",");
                    }
                  }
                  gbookUserList=res.list;
                  $scope.gbookList = gbookUserList;
                }
              }
            );
        }

        //切换用户留言与所有留言
        $scope.switchGbookListStatus = false;
        $scope.switchGbookList = function(){
          if($scope.switchGbookListStatus){
            getUserList();
            $scope.switchGbookListStatus = false;
          }else{
            getAllList();
            $scope.switchGbookListStatus = true;
          }
        }
        //点赞、评论 集成操作
        $scope.toolsClick = function(i,name){
          if(name == "thumbsUp"){
            // console.log(1);
            var perCodeArr = [];
            if($scope.gbookList[i].cThumbsPerCode){
              perCodeArr = $scope.gbookList[i].cThumbsPerCode.split(',');
            }
            // console.log(perCodeArr);
            var index = perCodeArr.indexOf($scope.currentPerson.code);
            var iThumbsUpCnt = $scope.gbookList[i].iThumbsUpCnt;
            if(index  > -1){
              perCodeArr.splice(index, 1);
              iThumbsUpCnt--;
              if(iThumbsUpCnt < 0){
                iThumbsUpCnt = 0;
              }
            }else{
              perCodeArr.push($scope.currentPerson.code);
              iThumbsUpCnt++;
            }
            var upObj={
              presetfield2:1,
              iMIAID:$scope.gbookList[i].iMIAID,
              cThumbsPerCode:perCodeArr.join(','),
              iThumbsUpCnt:iThumbsUpCnt
            };
            // console.log(upObj)
            $resource(serverUrl + '/Microinformation/saveDataFromList')
            .save(upObj,function (res) {
              console.log(res);
              if(res.Result.iRsult == 1){
                $scope.gbookList[i].iThumbsUpCnt = iThumbsUpCnt;
                $scope.gbookList[i].cThumbsPerCode = perCodeArr.join(',');
                // $scope.$apply();
              }
            });
          }else if(name == "comment"){
            if($scope.gbookList[i].commentContent){
              var cComment = $scope.gbookList[i].cComment;
              cComment.push({
                name:$scope.currentPerson.name,
                content:$scope.gbookList[i].commentContent
              });
              console.log(cComment)
              var upObj={
                presetfield2:2,
                iMIAID:$scope.gbookList[i].iMIAID,
                cComment:JSON.stringify(cComment)
              };
              // console.log(upObj)
              $resource(serverUrl + '/Microinformation/saveDataFromList')
              .save(upObj,function (res) {
                // console.log(res);
                if(res.Result.iRsult == 1){
                  // $scope.$apply();
                  $scope.gbookList[i].commentContent = "";
                }
              });
            }
          }
        }
        //图片查看大图
        $scope.viewImg = function(index,items){
          wx.previewImage({
            current: items[index], // 当前显示图片的http链接
            urls: items // 需要预览的图片http链接列表
          });
        }

        
        //是否显示查看更多评论按钮
        $scope.viewMoreComment = function(i){
          $scope.gbookList[i].showMoreStatus = !$scope.gbookList[i].showMoreStatus;
        }
        //是否显示评论输入框
        $scope.showComment = function(i){
          $scope.gbookList[i].showComment = !$scope.gbookList[i].showComment;
        }
        //发布
        $scope.addGbook = function(){
          $state.go('addgbook',{ action : $scope.action ,title:$scope.title })
        }



        $scope.allMenu = false;
        //拉取权限人员
        $resource(serverUrl+'/Microinformation/getPermissionComment').get({},function(res){
          for ( var i = 0;i< res.head.length ; i++) {
            if(res.head[i].cPersonUUID == menus.cPersonUUID){
              $scope.allMenu = true;
            }
          }
          if($scope.allMenu){
            getUserList();
          }else{
            getAllList();
          }
        })
      }]
    }
  });
