/**
 * 全排列
 * @param {所有个数} n
 * @param {要求个数} k
 */
let combine = function (n, k) {
  let ret = [];
  let helper = (start, prev) => {
    console.log(start, prev);

    let len = prev.length;
    if (len === k) {
      ret.push(prev);
      return;
    }
    for (let i = start; i <= n; i++) {
        console.log(i);
      helper(i + 1, prev.concat(i));
    }
  };
  helper(1, []);
  return ret;
};

console.log(combine(4, 2));




 remote(obj => {
  console.log('param is fun():',obj);
 })

function remote(fun) {
  const a = 1;
  const b = 2;
  if(fun) {
    fun(a+b);
    console.log(fun)
  }
}




let headers = {
  A1: { v: '项目' },
  B1: { v: '查询总数（人次）' },
  C1: { v: '咨询方式（人次）' },
  P1: { v: '咨询类型（件）' },
  Z1: { v: '处理方式（件）' },
  C2: { v: '来访合计' },
  D2: { v: '分类' },
  L2: { v: 'cola' },
  M2: { v: 'colb' },
  O2: { v: 'colc' },
  D3: { v: 'cold' },
  E3: { v: 'cole' },
  F3: { v: 'colf' },
  G3: { v: 'colg' },
  H3: { v: 'colh' },
  I3: { v: 'coli' },
  J3: { v: 'colj' },
  K3: { v: 'colk' },
  M3: { v: '合计' },
  N3: { v: 'coll' },
  P2: { v: '合计' },
  Q2: { v: '刑事' },
  R2: { v: 'colm' },
  S2: { v: 'coln' },
  T2: { v: 'colo' },
  U2: { v: 'colp' },
  V2: { v: 'colq' },
  W2: { v: 'colr' },
  X2: { v: 'cols' },
  Y2: { v: 'colt' },
  Z2: { v: 'coul' },
  AA2: { v: 'colu' },
  AA3: { v: '合计' },
  AB3: { v: '受理并批准' },
  AC2: { v: 'colw' },
  A4: { v: '' },
  B4: { v: 1 },
  C4: { v: 2 },
  D4: { v: 3 },
  E4: { v: 4 },
  F4: { v: 5 },
  G4: { v: 6 },
  H4: { v: 7 },
  I4: { v: 8 },
  J4: { v: 9 },
  K4: { v: 10 },
  L4: { v: 11 },
  M4: { v: 12 },
  N4: { v: 13 },
  O4: { v: 14 },
  P4: { v: 15 },
  Q4: { v: 16 },
  R4: { v: 17 },
  S4: { v: 18 },
  T4: { v: 19 },
  U4: { v: 20 },
  V4: { v: 21 },
  W4: { v: 22 },
  X4: { v: 23 },
  Y4: { v: 24 },
  Z4: { v: 25 },
  AA4: { v: 26 },
  AB4: { v: 27 },
  AC4: { v: 28 }
};
//表格数据
let data = {
  A5: { v: '' },
  B5: { v: 1 },
  C5: { v: 2 },
  D5: { v: 3 },
  E5: { v: 4 },
  F5: { v: 5 },
  G5: { v: 6 },
  H5: { v: 7 },
  I5: { v: 8 },
  J5: { v: 9 },
  K5: { v: 10 },
  L5: { v: 11 },
  M5: { v: 12 },
  N5: { v: 13 },
  O5: { v: 14 },
  P5: { v: 15 },
  Q5: { v: 16 },
  R5: { v: 17 },
  S5: { v: 18 },
  T5: { v: 19 },
  U5: { v: 20 },
  V5: { v: 21 },
  W5: { v: 22 },
  X5: { v: 23 },
  Y5: { v: 24 },
  Z5: { v: 25 },
  AA5: { v: 26 },
  AB5: { v: 27 },
  AC5: { v: 28 }
};
// 合并 headers 和 data
var output = Object.assign({}, headers, data);
// 表格范围，范围越大生成越慢 
let ref = 'A1:ZZ100';
//合并单元格设置
var merges = [
  { s: { c: 0, r: 0 }, e: { c: 0, r: 2 } }, //项目
  { s: { c: 1, r: 0 }, e: { c: 1, r: 2 } }, //查询总数（人次）
  { s: { c: 2, r: 0 }, e: { c: 14, r: 0 } }, //咨询方式（人次）
  { s: { c: 15, r: 0 }, e: { c: 24, r: 0 } }, //咨询类型（件）
  { s: { c: 25, r: 0 }, e: { c: 28, r: 0 } }, //处理方式（件）
  { s: { c: 2, r: 1 }, e: { c: 2, r: 2 } },
  { s: { c: 3, r: 1 }, e: { c: 10, r: 1 } },
  { s: { c: 3, r: 2 }, e: { c: 3, r: 2 } },
  { s: { c: 4, r: 2 }, e: { c: 4, r: 2 } },
  { s: { c: 5, r: 2 }, e: { c: 5, r: 2 } },
  { s: { c: 6, r: 2 }, e: { c: 6, r: 2 } },
  { s: { c: 7, r: 2 }, e: { c: 7, r: 2 } },
  { s: { c: 8, r: 2 }, e: { c: 8, r: 2 } },
  { s: { c: 9, r: 2 }, e: { c: 9, r: 2 } },
  { s: { c: 10, r: 2 }, e: { c: 10, r: 2 } },
  { s: { c: 11, r: 1 }, e: { c: 11, r: 2 } },
  { s: { c: 12, r: 1 }, e: { c: 13, r: 1 } },
  { s: { c: 15, r: 1 }, e: { c: 15, r: 2 } },
  { s: { c: 16, r: 1 }, e: { c: 16, r: 2 } },
  { s: { c: 17, r: 1 }, e: { c: 17, r: 2 } },
  { s: { c: 18, r: 1 }, e: { c: 18, r: 2 } },
  { s: { c: 19, r: 1 }, e: { c: 19, r: 2 } },
  { s: { c: 20, r: 1 }, e: { c: 20, r: 2 } },
  { s: { c: 21, r: 1 }, e: { c: 21, r: 2 } },
  { s: { c: 22, r: 1 }, e: { c: 22, r: 2 } },
  { s: { c: 23, r: 1 }, e: { c: 23, r: 2 } },
  { s: { c: 24, r: 1 }, e: { c: 24, r: 2 } },
 
  { s: { c: 25, r: 1 }, e: { c: 25, r: 2 } },
  { s: { c: 26, r: 1 }, e: { c: 27, r: 1 } },
  { s: { c: 28, r: 1 }, e: { c: 28, r: 2 } }
];

console.log(output);