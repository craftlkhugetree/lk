setTimeout(function () {
    var b =document.title;
    var a =BI.designConfigure.reportId;//获取仪表板id
    //对仪表板id进行判断，实现指定仪表板刷新
    if (a==="68f1150e9cb4444fb583f1ca5153daa8") {
     setInterval(function () {
      BI.SharingPool.put("controlFilters", BI.Utils.getControlCalculations());
      //Data.SharingPool.put("controlFilters", BI.Utils.getControlCalculations());
      BI.Utils.broadcastAllWidgets2Refresh(true);
     }, 5000000);//5000000为定时刷新的频率，单位ms
    }
   }, 2000)