var Employee = /** @class */ (function () {
    function Employee(name, salary) {
        this.name = name;
        this.salary = salary;
    }
    return Employee;
}());
var Department = /** @class */ (function () {
    function Department(employees) {
        this.employees = employees;
    }
    Department.prototype.works = function (employee) {
        return this.employees.indexOf(employee) > -1;
    };
    return Department;
}());
function and(predicates) {
    return function (e) { return predicates.every(function (p) { return p(e); }); };
}
function employeeSalaries(employees, conditions) {
    var filtered = employees.filter(and(conditions));
    return filtered.map(function (e) { return e.salary; });
}
function averageSalary(employees, conditions) {
    return average(employeeSalaries(employees, conditions));
}
function average(nums) {
    var total = nums.reduce(function (a, b) { return a + b; }, 0);
    return nums.length == 0 ? 0 : total / nums.length;
}
// function averageSalary(employees: Employee[], conditions: Predicate[]): number {
//   const filtered = employees.filter(and(conditions));
//   const salaries = filtered.map((e) => e.salary);
//   const total = salaries.reduce((a, b) => a + b, 0);
//   return salaries.length == 0 ? 0 : total / salaries.length;
// }
//   function averageSalary(employees: Employee[], conditions: Predicate[]): number {
//     let total = 0;
//     let count = 0;
//     employees.forEach((e) => {
//       if(and(conditions)(e)){
//         total += e.salary;
//         count += 1;
//       }
//     });
//     return (count == 0) ? 0 : total / count;
//   }
// function averageSalary(employees: Employee[], minSalary: number, department?: Department): number {
//     let total = 0;
//     let count = 0;
//     employees.forEach((e) => {
//         // e的薪水高于最低工资，并且没传入部门，或者传入的部门包含这个员工e
//         if (minSalary <= e.salary && (department === undefined || department.works(e))) {
//             total += e.salary;
//             count += 1;
//         }
//     });
//     return total === 0 ? 0 : total / count;
// }
var empls = [
    new Employee("Jim", 100),
    new Employee("John", 200),
    new Employee("Liz", 120),
    new Employee("Penny", 30),
];
var sales = new Department([empls[0], empls[1]]);
console.log(averageSalary(empls, [function (e) { return e.salary > 50; }, function (e) { return sales.works(e); }]));
// describe("average salary", () => {
//     const empls = [
//       new Employee("Jim", 100),
//       new Employee("John", 200),
//       new Employee("Liz", 120),
//       new Employee("Penny", 30)
//     ];
//     const sales = new Department([empls[0], empls[1]]);
//     it("calculates the average salary", () => {
//       expect(averageSalary(empls, 50, sales)).toEqual(150);
//       expect(averageSalary(empls, 50)).toEqual(140);
//     });
//   });



/**
 * fineReport  冻结表头的表格自动滚动
 */
if (window.interval2) { clearInterval(window.interval2); }
setTimeout(function () {
    window.flag = true;
    $("#frozen-center").mouseover(function () {
        window.flag = false;
    })
    //鼠标悬停，滚动停止
    $("#frozen-center").mouseleave(function () {
        window.flag = true;
    })
    //鼠标离开，继续滚动
    var old = -1;
    window.interval2 = setInterval(function () {
        if (window.flag) {
            currentpos = $("#frozen-center")[0].scrollTop;
            if (currentpos == old) {
                $("#frozen-center")[0].scrollTop = 0;
            }
            else {
                old = currentpos;
                $("#frozen-center")[0].scrollTop = currentpos + 3.5;
            }
        }
    }, 60);
    //以60ms的速度每次滚动3.5PX
}, 1000)


if (window.interval2) { clearInterval(window.interval2); }
setTimeout(function () {
    $("div[widgetname=REPORT0]").find("#frozen-north")[0].style.overflow = "hidden";
    $("div[widgetname=REPORT0]").find("#frozen-center")[0].style.overflow = "hidden";
}, 100);
//隐藏报表块report0的滚动条  
window.flag = true;
setTimeout(function () {
    $("#frozen-center").mouseover(function () {
        window.flag = false;
    })
    //鼠标悬停，滚动停止  
    $("#frozen-center").mouseleave(function () {
        window.flag = true;
    })
    //鼠标离开，继续滚动  
    var old = -1;
    window.interval2 = setInterval(function () {
        if (window.flag) {
            currentpos = $("#frozen-center")[0].scrollTop;
            if (currentpos == old) {
                $("#frozen-center")[0].scrollTop = 0;
            }
            else {
                old = currentpos;
                $("#frozen-center")[0].scrollTop = currentpos + 1.5;
            }
        }
    }, 25);
    //以25ms的速度每次滚动3.5PX  
}, 1000)

// js主要实现的功能是：决策报表块在冻结标题行后实现循环滚动，鼠标悬停暂停和鼠标离开继续滚动的效果(隐藏了滚动条)。悬停事件为mouseover，离开事件为


// mouseleave。
// 注：div[widgetname=REPORT0]")里需根据报表块名称修改，这里是report0;
// 注：如果想实现多报表块同时滚动，则将$("#frozen-center")替换为$(".frozen-center")，[0]表示报表块的位置，如果不是第一个需要换成对应的位置。 

// 判定元素是否滚动到底：
// element.scrollHeight - element.scrollTop === element.clientHeight

// 返回顶部
// element.scrollTop = 0

if (window.interval2) { clearInterval(window.interval2); }
setTimeout(function () {
    window.flag = true;
    $("#frozen-center > [class*='技改项目']").mouseover(function () {
        window.flag = false;
    })
    //鼠标悬停，滚动停止
    $("#frozen-center > [class*='技改项目']").mouseleave(function () {
        window.flag = true;
    })
    //鼠标离开，继续滚动
    var old = -1;
    window.interval2 = setInterval(function () {
        if (window.flag) {
            currentpos = $("#frozen-center > [class*='技改项目']")[0].scrollTop;
            if (currentpos == old) {
                $("#frozen-center > [class*='技改项目']")[0].scrollTop = 0;
            }
            else {
                old = currentpos;
                $("#frozen-center > [class*='技改项目']")[0].scrollTop = currentpos + 2.5;
            }
        }
    }, 60);
    //以60ms的速度每次滚动2.5PX
}, 1000)

setTimeout(function () {
    window.flag = true;
    $("#frozen-center > [class*='技改项目']").mouseover(function () {
        window.flag = false;
    })
    //鼠标悬停，滚动停止
    $("#frozen-center > [class*='技改项目']").mouseleave(function () {
        window.flag = true;
    })
    //鼠标离开，继续滚动
    var old = -1;
    window.interval2 = setInterval(function () {
        if (window.flag) {
            currentpos = $(".frozen-center")[9].scrollTop;
            if (currentpos == old) {
                $(".frozen-center")[9].scrollTop = 0;
            } else {
                old = currentpos;
                $(".frozen-center")[9].scrollTop = currentpos + 2.5;
            }
        }
    }, 60);
    //以60ms的速度每次滚动2.5PX
}, 1000)

setTimeout(function () {
    $("div[widgetname=技改项目表_c]").find("#frozen-north")[0].style.overflow = "hidden";
    $("div[widgetname=技改项目表_c]").find("#frozen-center")[0].style.overflow = "hidden";
}, 300);
//隐藏报表块REPORT1的滚动条  
window.flag = true;
setTimeout(function () {
    $("#frozen-center").mouseover(function () {
        window.flag = false;
    })
    //鼠标悬停，滚动停止  
    $("#frozen-center").mouseleave(function () {
        window.flag = true;
    })
    //鼠标离开，继续滚动  
    var old = -1;
    var interval = setInterval(function () {
        if (window.flag) {
            currentpos = $("#frozen-center")[0].scrollTop;
            if (currentpos == old) {
                $("#frozen-center")[0].scrollTop = 0;
            } else {
                old = currentpos;
                $("#frozen-center")[0].scrollTop = currentpos + 1.5;
            }
        }
    }, 100);
}, 1000)


const n = 5;
const timer = setInterval(() => {
    const div = $("div:contains('正在试用功能'):not([id]):not([class])")
    if (div.length > 0) {
        div.prev().css('display', 'none');
        div.css('display', 'none');
    }
    div.length === n ? clearInterval(timer) : null;
}, 50);



//setInterval(() => {
////	this.options.form.getWidgetByName("chart1").fireEvent('click');
//	this.options.form.getWidgetByName("chart1").fireEvent('mouseover');
//	
//	this.options.form.getWidgetByName("chart1").fireEvent('mouseleave');
//},500);

var text0 = this.getValue();
var arr = text0.split(",");
var i = 1;
var a = this.options.form.getWidgetByName("chart1");
setInterval(function () {
    var value = arr[i];
    if (i <= arr.length) {
        a.setValue(value);
        _g().parameterCommit();
        if (i == arr.length - 1) {
            i = 0;
        } else {
            i = i + 1;
        }
    }
}, 5000);


var suf = '&区域='
var area = '珠山区'
var url = encodeURI(encodeURI("${servletURL}?viewlet=报表演示/jdzPop.frm" + suf + area));
var iframe = $("<iframe id='001' name='001' width='100%' height='100%' scrolling='yes' frameborder='0'>") // iframe参数的命名及宽高等
iframe.attr("src", url) //1.cpt为点击查询时，对话框中显示的子报表
var o = {
    title: "规上企业",
    width: 1000,
    height: 800
}
FR.showDialog(o.title, o.width, o.height, iframe, o) //弹出对话框


