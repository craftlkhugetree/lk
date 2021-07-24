1. 下拉框条件
   SELECT
	cdataname /*AS [企业名称]*/,
	cdatacode AS [组织机构代码],
	cgrade_final /*AS [评级]*/,
	iScore AS [评分],
	cDEntityName /*AS [企业类型]*/,
	cTradeName /*AS [行业]*/,
	cDCName /*AS [乡镇]*/,
	cpossname AS [属地],
	cEstaName /*AS [产业]*/,
	cgardname AS [园区],
	clabelname AS [自定义标签],
	cLatitudeLongitude AS [经纬度],
	iyear /*AS [年份]*/,
	iQuarter AS [季度],
	iMonth AS [月份],
	cdatacycletype AS [上报类型],
	cdatamuuid AS [企业UUID],
	总能耗（吨标煤）AS 总能耗,
	用地面积(亩) AS [用地面积],
	cQ2 AS [年平均职工人数（人）],
	税收实际贡献(万元) AS [实际税收（万元）],
	cQ4 AS [销售收入（万元）],
	cQ5 AS [研发经费支出（万元）],
	cQ6 AS [工业总产值(万元)],
	cQ7 AS [资产合计(万元)],
	cQ8 AS [负债合计(万元)],
	cQ9 AS [资产负债率(%)],
	cQ10 AS [燃气用量(立方米)],
	cQ11 AS [用热量(吨)],
	cQ12 AS [用电量(万千瓦时)],
	cQ13 AS [居民用水量(立方米)],
	cQ14 AS [工业用水(立方米)],
	cQ15 AS [用水量(立方米)],
	cQ16 AS [主要污染物排放总当量],
	cQ17 AS [总能耗(吨标煤)],
	cQ18 AS [污染物排放],
	cQ19 AS [资产负债率] 
FROM
	YcDCAS WITH ( nolock )
WHERE
	iyear = '${iyear}'
	AND cDEntityName = '${cDEntityName}'
	AND (('${cDCName}' ='') OR (cDCName <> '' AND cDCName = '${cDCName}'))
		AND (('${cTradeName}' ='') OR (cTradeName  <> '' AND cTradeName  = '${cTradeName}'))
			AND (('${cEstaName}' ='') OR (cEstaName  <> '' AND cEstaName  = '${cEstaName}'))
				AND (('${cgrade_final}' ='') OR (cgrade_final  <> '' AND cgrade_final  = '${cgrade_final}'))

2. sql条件：
 SET NOCOUNT ON  

--set @temp="tempdb..'${tbName}'"
--set @dbo="dbo.'${tbName}'"
--if object_id('tempdb..#ls') is not null drop table dbo.#ls
--if object_id("tempdb..${tbName}") is not null drop table "dbo.${tbName}"
--if exists dbo.${tbName} drop dbo.${tbName}
select * into ${tbName} from ls_temp where 1 = 2
INSERT INTO ${tbName} exec  super_result ${cAccuniqueid}

select 
	cdataname AS [企业名称],
--	cdatacode AS [组织机构代码],
	cgrade_final AS [评价等级],
--	iScore AS [评分],
	cDEntityName AS [企业类型],
	cTradeName AS [行业],
	cDCName AS [区域],
	cEstaName AS [所属产业],
--	cgardname AS [园区],
	iyear AS [年份],
--	iQuarter AS [季度],
	iMonth AS [月份],
	[总能耗(吨标准煤)] AS [总能耗],
	[用地面积(亩)] AS [用地面积],
	[年平均职工人数(人)] AS [年平均职工人数（人）],
	[税收实际贡献(万元)] AS [实际税收（万元）],
	[销售收入(万元)] AS 	[销售收入（万元）],
	[研发经费支出(万元)] AS [研发经费支出（万元）],*
	
from ${tbName}
where 1=1 AND cdataname<>''
${if(len(区域)==0,''," and cDCName='" + 区域 + "'")}
${if(len(评价等级)==0,''," and cgrade_final='" + 评价等级 + "'")}
${if(len(年份)==0,''," and iYear ='" + 年份 + "'")}
${if(len(企业类型)==0,''," and cDEntityName ='" + 企业类型 + "'")}
${if(len(行业)==0,''," and cTradeName ='" + 行业 + "'")}
${if(len(所属产业)==0,''," and cEstaName ='" + 所属产业 + "'")}
SET NOCOUNT OFF   

3. 钻取表格：
select * from ${tableName}
where 1=1 AND 企业名称<>''
${if(len(区域)==0,''," and 区域='" + 区域 + "'")}
${if(len(评价等级)==0,''," and 评价等级='" + 评价等级 + "'")}
${if(len(所属产业)==0,''," and 所属产业='" + 所属产业 + "'")}



运河开发区 603336 fqige6681399cb53461d872186ab71c828ac lizhigang 123456

演示? 720591 butt8565b2c6f8e54a59ad6c2433e4de43d9 julingling   123456

禹城市工信局 509944 ycgx01 gxj@123 xebi4a49232c9f7e4798b70505d3a7bca040 zhangqiang xamp309530616cbe4014b1fc8b6b4705ae53

720591   mcfx   mcfx@1

德城区 001156 dcmcfx mcfx@1 smvt62f8f2fe764b43eba87a2b1da5d65a35 cuiwei fh29eb559751ba9d4de6aa656e14ff7c7b22

陵城区 747676 lcmcfx mcfx@1 0u36250117e2b97b401ab867cfd10b09067f lcqpjbgly wyeg83b16e4f0d124f4c98d78c98bc7122ac

武城县 858205 wcmcfx mcfx@1 627v5d6bc5c6a1a2423786698cfe86b89f1c wangpeipei 3bvtbff10986a9d2472abe5c2f0fb684f158

临邑县 375261 lymcfx mcfx@1 1onu092ea13c8212406d892736f5413edfda wangle 

庆云县 258933   qymcfx   mcfx@1 xdvdd92690ca45dc4dbea5e272356363ca3f xuwenju el6sfd3837f5e1e143b39d90ca2f1d3f563c

夏津县 342413   xjmcfx   mcfx@1  g9az921eb94746c74824a637c6ba91a1fc37 wangzhongya

德州市开发区 622891  kfqmcfx    mcfx@1  l48a2afc9fbc04614cb492055a4a93ee2cc5 gaga    vi59f11f8c5e5ca341d9ac2707653c2bef42

德州组织部 926349 18561167080 123456

向日葵: 747 448 529 yucheng

德州市政府(工信局)(演示) 078962     15988888888 123456 uxqa64b5a045fec14511b0b48a93e3aafa9f

遵化市工信局 tu5zb170d8cf8e604e2fa2faecfacdbe5b6a

合肥市工信局 y3msc3eb505c52c04926b1ace043754174b2

德州市经开区工信局 i9v7abde112e80f1473f8b32c4b91d914d71

德州市工商联合会 7fkv9b0dea0c9d8a458d8d8357ec93406127

德州市工信局(真的) 570381 zhaojunjie 123456 2lru864e04cd2e6749bf8fdcd5771b5f4713

咸阳市: 116811 wangzhitian 123456 bpzy035656775ebe4b94a8eca7c77faa3ad1

景德镇 253394 13111714366 123456 adqse78289b9dbbd4ff395934c86c9c0a976

日照市 733504 songzhiwei 123456 m4e4cf0694dcdf5c46d1b74300ff588186bf