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
