class Employee {
  constructor(public name: string, public salary: number) {}
}

class Department {
  constructor(public employees: Employee[]) {}

  works(employee: Employee): boolean {
    return this.employees.indexOf(employee) > -1;
  }
}

type Predicate = (e: Employee) => boolean;

function and(predicates: Predicate[]): Predicate {
  return (e) => predicates.every((p) => p(e));
}

function employeeSalaries(
  employees: Employee[],
  conditions: Predicate[]
): number[] {
  const filtered = employees.filter(and(conditions));
  return filtered.map((e) => e.salary);
}

function averageSalary(employees: Employee[], conditions: Predicate[]): number {
  return average(employeeSalaries(employees, conditions));
}

function average(nums: number[]): number {
  const total = nums.reduce((a, b) => a + b, 0);
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

const empls = [
  new Employee("Jim", 100),
  new Employee("John", 200),
  new Employee("Liz", 120),
  new Employee("Penny", 30),
];

const sales = new Department([empls[0], empls[1]]);

console.log(
  averageSalary(empls, [(e) => e.salary > 50, (e) => sales.works(e)])
);

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


let vue2 = [
  {
    tileNameList: [
      {
        title: "版本",
        prop: "version",
      },
      {
        title: "客户号",
        prop: "clientNo",
      },
      {
        title: "金额",
        prop: "money",
      },
    ],
    tableValList: [
      {
        version: 0,
        clientNo: "CUST2021....",
        money: "1000.000000",
      },
      {
        version: 0,
        clientNo: "CUST2021....",
        money: "1000.000000",
      },
      {
        version: 1,
        clientNo: "CUST2021....",
        money: "20000.000000",
      },
      {
        version: 0,
        clientNo: "CUST2021....",
        money: "1000.000000",
      },
      {
        version: 0,
        clientNo: "CUST2021....",
        money: "50000.000000",
      },
    ],
    sqlTitle: "测试",
  },
];