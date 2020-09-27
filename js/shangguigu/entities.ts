obj = {
  
}

// 判断输入符合条件
judgeText(str: any) {
  if (!!str && !!str.replace(/\s*/g, '')) {
    // str = str.replace(/\\/g, '');
    return true;
  }
}
// 判断不输入符合条件
judgeT(str: any) {
  if (!str || !str.replace(/\s*/g, '')) {
    return true;
  }
}

resetObj(){

}


resetFlag(){

}


repSig(str) {
  let sig = [',', '\\.', '\\\\', '/', '<', '>', ';', ':', '"', '{', '}', "'", '；', '。'];
  for (let i = 0; i < sig.length; i++) {
    let p = new RegExp(sig[i], 'g');
    str = str.replace(p, '');
    // console.log("str:",str)
  }
  return str;
}