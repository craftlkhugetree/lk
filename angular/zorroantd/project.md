D:\lk\js\shangguigu\shangguiguChao.js
D:\lk\html\sggchao.txt
D:\lk\html\flex布局\flex布局.txt
D:\lk\java\java单体.md
D:\lk\Vue\vue3_test1\Vue2.md
D:\lk\Vue\vue3_test1\Vue3.md
C:\Users\Administrator\WeChatProjects\miniprogram-1\testVueOrigin    vue源码解析
ip地址preUrl; console; debugger; environment.prod

# 按时间算工时
2021-05	
1. 景德镇展示新增2个移动端云图	（亩产和陶瓷产业链），大概8工时；
2. 组织部需求变更，涉及情况上报、审核等6个页面，大概4工时；新增加2个分析展示页面，大概12工时。共计16工时。
	45.上报计划落实情况：将整体评价和工作建议放在最下面，加一个分隔线（涉及3个页面，大概2工时）；
	46.落实计划上报和落实情况上报的上报审核状态分开（涉及6个页面，大概4工时）；
	55.省考/省落后加上分析展示（新增加2个页面，大概18工时）；
	共计24工时。
3. 德州市高端零部件产业链大屏云图；4工时
4. 咸阳市亩产效益云图（建立4个页面，分配菜单）；4工时
   咸阳市生物医药及医疗器械产业链驾驶舱。再加上4个简单页面和菜单。估计4工时

1. 电税分析：纳税数据录入(批量导入)等  40工时
    const url = 父 '/electricity-tax-analysis/taxDataUpload'   // 子 '/electricity-tax-analysis/entTaxTable'
	// const url = '/electricity-tax-analysis/elecTaxAnalysis'
    // const url = '/electricity-tax-analysis/localTotalPower'

1. 电税分析优化
2. 数据采集，附加分采集增加导出功能，预计2工时；  
3. 纳税数据录入页面批量导入更改设计，预计2工时。
4. 新增配置管理页面，涉及一级页面1个，二级页面3个，三级页面2个，预计16工时。
	src/app/routes/sys-manage/config-manage/		

2021-06
1. 原有的fine BI云图更新企业logo和抬头，有开发区4个，禹城3个，亩产4个，更多其他页面9，估计4工时。
2. 经济运行-基础设置优化，通过研究angular脏检测机制，优化dom更新方式，使得一级页面性能大幅度提升，减少丢帧，提高流畅度。4工时。

1. 配置管理一级页面的模态框，增加三个参照更改输入逻辑，共6工时。
2. 电税分析统一格式，G2图表样式更改，新增合计趋势。共6工时。
3. 闻总提出：市级经济运行的重点产品趋势、原材料趋势增加企业搜索条件，承接2个跳转页带来的企业名称。同时更新4个页面的相关逻辑条件。估计4工时
4. 组织部loading，batch upload优化；四上库原因和变更记录优化。
5. 电税分析：企业纳税报表趋势图坐标新增12个月。市经济运行9个页面：所有柱图更新同比图例和坐标轴。总共估计4工时

1. 亩产：/DCAS-BasicSetting/AddScoreIndex附加评分指标  浮动评分，填写提示。附加分采集：下载模板改为新的填写提示。估计6工时。
2. 市级亩产：默认上年；市级经济运行：统一单位。估计2工时
3. /SystemNotice/NoticeList我创建的通知，跨部门多选人员时，点击下一个部门时，上一个部门的已选人员消失。  估计4工时。
4. 我创建的通知，实现点选某局，下面的部门自动勾选。修复勾选时的标志错误反转,ngModel没有（）。估计2工时。
5. /SysManage/updatePasswd 和 src\app\routes\login\login.component.ts  提升密码强度，修改登录界面并跳转到密码变更界面。估计6工时。
6. /SystemNotice/EnterpriseGroup  分组管理，新增分组原因。估计2工时。
7. 取消通知列表的新增通知功能，新增一个发送通知页面。估计8工时。/SystemNotice/sendNotice2  
8. 所有产业链相关云图（德州、景德镇、西安），冻结表头，防止上下滚动丢失背景标题和表头。估计2工时
9.  fineReport制作德州家具产业链、德州体育产业链2张云图，估计8工时。

2. 亩产：申诉查看-增加接口参数,更改表头接口。详情展示改为调用接口获取申诉指标。申诉查看、数据采集、附加分采集修改列宽，增加附加提示。估计4工时。
3. 亩产st表格加上边框bordered
4. 附加分采集在跳转时丢失cOrgUUID_sj，原因是正式平台没有分配菜单。
5. 亩产-部门任务，添加规上/规下标志，跳转时保证页面自动选择规上/规下。  3,4,5总计4工时。

6. 附加分采集replace('uuid_', 'befor_'); 解决参数、下拉框数组，列表字符串找不到forEach的问题。2工时。
7. st表格表头宽度固定，表体单元格宽度取最普通的宽度。表头默认有个.text-right样式，让一些表头居右显示。2工时。
8. 帆软云图，由于实施修改了禹城亩产的数据库字段名，导致云图无法正常展示数据。2工时。
9. 亩产：附加分采集，编辑保存时，  下拉框会有个隐藏的‘否’，要求若原数据为空，即‘否’时，选择数据时，应先清除，再push数据。2工时。
10. 亩产模板下载，增加适用测试平台条件，去掉一个/。url路径采用href替换pathname，防备万一变成hash模式。2工时。
11. 通知列表增加单独回复功能。
12. fineReport实现自动滚屏，报表滚动时，鼠标悬浮报表，滚动会停止；鼠标移开，再次滚动。4工时。
13. 亩产数据采集、附加分采集将跳转后的编辑参数，扩展到普通编辑。2工时。
14. rxjs解决下拉框数据过多的问题。4工时。
15. 市级亩产规上、规下页面，增加合计功能。2工时。
16. 组织部优化card高度min-height。2工时。
17. 为张燕提供云图截图。

2021-07
1. 亩产数据审核，增加状态4已上传。2工时。
2. 亩产附加分审核，/DCAS-DataCollection/AddScoreCollection，增加状态栏，同时增加详情页面。4工时。
3. 奥链政企协同工业互联网平台云图，设计器安装目录齿轮插件。屏蔽试用条幅。服务器安装扩展图表插件。服务器升级。
4. 解决亩产附加分审核本地样式正常，发版后在其他浏览器有错位的问题。

1. 亩产数据审核，增加状态5未下发，同时更新逻辑和页面。
2. fineReport服务器升级后出现若干问题：地图蓝山黛无效，需改为无；图表-特效-条件显示报错（高级图表交互未注册）；钻取不能再使用悬浮图表窗，改为网络图表-对话框。涉及10张云图。
3. 亩产附加分审核增加状态5未下发。
4. 亩产数据审核，企业确认下发时，CheckBox的change()不包含没有数据的列。
5. fineReport服务已购买扩展插件功能，可能是版本不匹配导致服务器端不显示，本地设计器应用商城更新插件。
6. 使用扩展图表失去了联动和钻取功能，利用JS实现点击跳转页面，同时研究跳转过程中的参数传递。
7. fineReport表格使用动图背景，需要上传到服务器上。
8. 亩产附加分审核修正st表格列宽普遍为200，与html中的style为300的冲突。





# 一、PC端：*************************************************************************************************************************************************
1. 四上库2020：四上库变更记录、移出正式库原因
http://192.168.16.103:8088/reserve-management/change-record
http://192.168.16.103:8088/reserve-management/remove-reason

2. 经济运行2020：基础设置
http://localhost:4200/eco-analysis/basicSettings

3. 组织部2020-2021：
    市考：计划上报f/审核、落实情况上报/审核、指标管理、综合查询、部门管理、年终评分、年终评分预审；
    省考、省考落后：计划上报f/审核、落实情况上报/审核、指标管理、综合查询、指标批量发布、重要节点调度（临时填报计划）
    控制台跳转。
http://localhost:4200/province-index/index-manage
http://localhost:4200/market-value-target/indexmain

4. 亩产在线确认2021：申诉查看、数据审核、数据采集、附加分采集、关联企业、评价结果查询。
http://192.168.16.103:8080/CNIC_M/app/index.html#/Index     mstsc:administrator xwl@123
http://localhost:4200/DCAS-DataReport/viewAppeals
http://localhost:4200/DCAS-DataReport/QueryDataData
http://localhost:4200/DCAS-DataCollection/DataCollection
http://localhost:4200/DCAS-DataCollection/ScoreCollection
http://localhost:4200/BusinessData/BusinessConnection
http://localhost:4200/DCAS-DataReport/DataReport

webapps\CNIC_M\app\modules\DCAS\EnterpriseConfirm\DataAppealInfo\module.js 上传文件
webapps\CNIC_M\app\modules\DCAS\EnterpriseConfirm\DataConfirm\module.js  打印合并行盖章，跳转到申诉上报
webapps\CNIC_M\app\components\directive\dt.treeView.js   默认跳转页面


5. 德城区政企端增加:
1:月报,原材料,重点产品新增审核界面,与原审核界面不同的是,新增按镇街、按体量（5亿、10亿、15亿）收入、按纳税过千万、按产业、按销售收入利润率等维度进行搜索展示;
2:定制格式月报详情查看,
3:定制格式原材料详情查看,
4:定制格式重点产品详情查看;
5:新增"大数据分析"页面,与原"大数据分析"页面不同的是按新字段展示;
6:新增"原材料分析"页面,与原"原材料指标生成"页面不同的是按新字段展示;
7:新增"重点产品分析"页面,与原"重点产品指标生成"页面不同的是按新字段展示;

6. 精益云门户迁移2020
   政企协同：栏目档案、信息发布
   https://zw.leancloud.biz/portal-management/ColumnFile
   https://zw.leancloud.biz/portal-management/InformationDelivery

7. 市产业链2020：图片demo
https://zw.leancloud.biz/chainquery/headerquery
src\app\routes\chainmap\all\all.component.ts  父类

8. 职责管理优化2020
src\app\routes\sys-manage\resbonsibility-management\resbonsibility-management.component.ts
forEach里不能splice，多用倒序。

9. 用户管理2020:参照拉取，nz-form  FormGroup
   src\app\routes\sys-manage\user-management\user-management.component.ts

10. 市级汇总2021：亩产效益(规上企业f、规下企业、区县对比分析)、经济运行；多表头合并与导出
src\app\routes\chain-analysis\above-scale-ent\above-scale-ent.component.ts
src\app\routes\chain-analysis\above-scale-ent\under-scale-ent.component.ts
src\app\routes\chain-analysis\district-analysis\district-analysis.component.ts

经济运行13个页面：柱图、饼图、跳转、多表头合并与导出；父子组件，@Input @Output模块化！ 企业经营f、收入指标分析f、养老金指标分析f、
 @ViewChild('childRef', { static: false }) public childRef: EcoSummaryMunicipalMultipleSDComponent;

/eco-summary-municipal/entOperation
src\app\routes\eco-summary-municipal\multiple-sd\multiple-sd.component.ts

ip地址preUrl; console; debugger; idxSearchObj:2019; 


11. 景德镇市云图演示2021：陶瓷产业企业运营数据；陶瓷行业交易大数据分析；景德镇市亩产效益；景德镇市经济运行；景德镇市陶瓷产业链；景德镇市项目管理
    /big-data-landscape/xmgl        /big-data-landscape/ceramicsIndusty


12. 重点产品填报、原材料填报2021：校验未填项。
    webapps\CNIC_M\app\modules\DCAS\EnterpriseDirectReport\ProductFilling\module.js
    
										if (updList[i].iCumulativeProductionLastYear === null || updList[i].iCumulativeProductionLastYear === undefined) {
											msg.alert("表体中行的去年累计产量不能为空!");
											return false;
										}
										if (updList[i].dAnnualDesignCapacity === null || updList[i].dAnnualDesignCapacity === undefined) {
											msg.alert("表体中行的年设计产能不能为空!");
											return false;
										}
										if (updList[i].iSalesVolumeSamePeriodLastYear === null || updList[i].iSalesVolumeSamePeriodLastYear === undefined) {
											msg.alert("表体中行的去年同期销量不能为空!");
											return false;
										}
										if (updList[i].iStockSamePeriodLastYear === null || updList[i].iStockSamePeriodLastYear === undefined) {
											msg.alert("表体中行的去年同期库存不能为空!");
											return false;
										}
   webapps\CNIC_M\app\modules\DCAS\EnterpriseDirectReport\MaterialFilling\module.js
   	               if((listAll[i].dSamePriceLastYear == ''|| listAll[i].dSamePriceLastYear == null) && listAll[i].dSamePriceLastYear != 0 ){
								msg.alert("请填写同期价格");
								return;
							}
							
							if(listAll[i].dSamePriceLastYear != ''&& listAll[i].dSamePriceLastYear != null && listAll[i].dSamePriceLastYear < 0){
								msg.alert("同期价格不能小于0");
								return;
							}
							if((listAll[i].dLastMonthPrice == ''|| listAll[i].dLastMonthPrice == null) && listAll[i].dLastMonthPrice != 0 ){
								msg.alert("请填写上月价格");
								return;
							}
							
							if(listAll[i].dLastMonthPrice != ''&& listAll[i].dLastMonthPrice != null && listAll[i].dLastMonthPrice < 0){
								msg.alert("上月价格不能小于0");
								return;
							}


13. 项目综合管理2020（合计，整数不精度）
	chainmap/proManage

# 二、移动端：*************************************************************************************************************************************************
1. 奥链政务2020：项目月报、项目填报    zw-alllink  remotes/origin/release/1.0.0-200730

   src\app\gov\project\monthly-report\monthly-report.page.ts
   src\app\gov\project\monthly-report\projectfilling\projectfilling.page.ts

2. 意见反馈2020：奥链3.0，图片居中。
aboutfeedback

3. 奥链3.0：2020 aolian3  release/3.0.3-200901
   src\app\gov\benefitpermu\enterpriserequery\enterpriserequery.page.ts
1、排名分析的指标能否把常用的放前面；
2、排名搜索出来的企业能否一点到达企业全景里，退回可回退到原排名这栏
3、企业查询里面，增加企业简介（PC端已有）


# 三、fineReport:*************************************************************************************************************************************************
1. 禹城市亩产效益2021
2. 经开区智慧统计产业链（移动端）2021
3. 景德镇市陶瓷产业链2021
4. 景德镇市亩产效益2021
5. 咸阳市产业链2021
6. 咸阳市亩产效益2021
7. 景德镇展示新增2个移动端云图	（亩产和陶瓷产业链）2021/05


# 四、fineBI:*************************************************************************************************************************************************
1. 遵化2020
2. 541二级产业（PC/移动端）2020




2020/06/02  北起楼，本加三，本外漆。
2021/06/02  康希诺单针




